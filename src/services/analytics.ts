import { useSyncExternalStore } from 'react';

/**
 * Google Analytics 4 through Google Tag Manager.
 *
 * GA4 is not exempt from consent in France (CNIL): Google Tag Manager is only loaded
 * after the visitor accepts the banner ("basic" Consent Mode v2: nothing at all is sent
 * before consent). Advertising signals always stay denied.
 *
 * Page views: the GA4 tag records them on browser history changes (enhanced
 * measurement), so every route change of the app counts as a page view.
 * Custom events are pushed to the dataLayer; GTM forwards them to GA4 (see the
 * setup steps given with this file).
 */

// Container "memoflow-client.vercel.app" of the "PIE Memoflow" Tag Manager account
const GTM_ID: string = import.meta.env.VITE_GTM_ID || 'GTM-KJR96BWV';
/** Production builds only, unless VITE_ANALYTICS_DEBUG=true (to test GTM preview locally) */
export const ANALYTICS_ENABLED = import.meta.env.PROD || import.meta.env.VITE_ANALYTICS_DEBUG === 'true';

type DataLayerEntry = Record<string, unknown> | IArguments;
declare global {
  interface Window {
    dataLayer: DataLayerEntry[];
  }
}

// ─── Consent ─────────────────────────────────────────────────────────────────
export type AnalyticsConsent = 'granted' | 'denied' | null; // null = not asked yet
const CONSENT_KEY = 'memoflow_analytics_consent';

const listeners = new Set<() => void>();
const readConsent = (): AnalyticsConsent => {
  const v = localStorage.getItem(CONSENT_KEY);
  return v === 'granted' || v === 'denied' ? v : null;
};

export function useAnalyticsConsent(): AnalyticsConsent {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    readConsent
  );
}

// gtag() must push the `arguments` object itself, not an array
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]): void {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

let gtmLoaded = false;

function loadGtm(): void {
  if (gtmLoaded || !ANALYTICS_ENABLED) return;
  gtmLoaded = true;
  gtag('consent', 'update', { analytics_storage: 'granted' });
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
  document.head.appendChild(script);
}

function deleteGaCookies(): void {
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (!name.startsWith('_ga') && !name.startsWith('_gid')) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ''}`;
    });
  });
}

/** Called once at startup, before anything is rendered */
export function initAnalytics(): void {
  if (!ANALYTICS_ENABLED) return;
  window.dataLayer = window.dataLayer || [];
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  });
  if (readConsent() === 'granted') loadGtm();
}

export function setAnalyticsConsent(granted: boolean): void {
  localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
  listeners.forEach((l) => l());
  if (granted) {
    loadGtm();
    return;
  }
  deleteGaCookies();
  // Once loaded, GTM cannot be unloaded: reload so nothing more is sent
  if (gtmLoaded) window.location.reload();
}

// ─── Events ──────────────────────────────────────────────────────────────────
// Never put personal data in parameters (email, name, document titles, tokens).
function track(event: string, params: Record<string, unknown> = {}): void {
  if (!gtmLoaded) return; // no consent: nothing is sent
  window.dataLayer.push({ event, ...params });
}

/** Acquisition: account creation form accepted (POST /auth/register → 202) */
export const trackSignUp = () => track('sign_up', { method: 'email' });

export const trackLogin = () => track('login', { method: 'email' });

/** Activation: a connector reached the "active" status */
export const trackToolConnected = (provider: string) => track('connect_tool', { tool: provider });

const trackedPlans = new Set<string>();
/** Activation: an AI plan was generated (once per planning job) */
export function trackPlanGenerated(jobId: string): void {
  if (trackedPlans.has(jobId)) return;
  trackedPlans.add(jobId);
  track('generate_plan');
}

// Conversion: no pricing page, export or payment exists in the app yet.
// Call these from those features when they are built.
export const trackViewPricing = () => track('view_pricing');
export const trackExportBlocked = () => track('export_blocked');
/** GA4 e-commerce format read by GTM ("Envoyer les données d'e-commerce", source: couche de données) */
export function trackPurchase(p: { transactionId: string; value: number; currency: string; plan: string }): void {
  if (!gtmLoaded) return;
  window.dataLayer.push({ ecommerce: null }); // clears the previous e-commerce object
  track('purchase', {
    ecommerce: {
      transaction_id: p.transactionId,
      value: p.value,
      currency: p.currency,
      items: [{ item_id: p.plan, item_name: p.plan, price: p.value, quantity: 1 }],
    },
  });
}
