import { useSyncExternalStore } from 'react';
import { capturePostHogEvent, startPostHog, stopPostHog } from './posthog';

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
 *
 * PostHog (services/posthog.ts) follows the same consent: started with GTM, stopped on
 * withdrawal, and every event below is also sent to PostHog.
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
  startPostHog();
}

/** PostHog (app et blog, même origine) : cookies et stockage ph_* et marque de refus __ph_opt_in_out_* */
function deletePostHogStorage(): void {
  const isPostHogKey = (key: string) => /^(__)?ph_/.test(key);
  [localStorage, sessionStorage].forEach((store) => {
    Object.keys(store).filter(isPostHogKey).forEach((key) => store.removeItem(key));
  });
  const host = window.location.hostname;
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (!isPostHogKey(name)) return;
    ['', host, `.${host}`].forEach((d) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ''}`;
    });
  });
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
    if (gtmLoaded) {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      startPostHog();
    } else {
      loadGtm();
    }
    return;
  }
  if (gtmLoaded) {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  }
  stopPostHog();
  deleteGaCookies();
  deletePostHogStorage();
}

// ─── Events ──────────────────────────────────────────────────────────────────
// Never put personal data in parameters (email, name, document titles, tokens).
function track(event: string, params: Record<string, unknown> = {}): void {
  if (!gtmLoaded || readConsent() !== 'granted') return;
  window.dataLayer.push({ event, ...params });
  capturePostHogEvent(event, params);
}

/**
 * Acquisition source captured on arrival, before in-app navigation drops the query string.
 * Blog CTAs use /inscription?from=<slug>; the IIM campaign has its own landing route.
 */
const SIGNUP_SOURCE = (() => {
  const from = new URLSearchParams(window.location.search).get('from');
  if (from && /^[a-z0-9-]{1,80}$/.test(from)) return from;
  return window.location.pathname === '/iim' ? 'iim' : undefined;
})();

/** Acquisition: account creation form accepted (POST /auth/register → 202) */
export const trackSignUp = () =>
  track('sign_up', { method: 'email', ...(SIGNUP_SOURCE && { signup_source: SIGNUP_SOURCE }) });

export const trackLogin = () => track('login', { method: 'email' });

/** Activation: an authenticated user completes workspace personalization */
export const trackOnboardingCompleted = () => track('onboarding_completed');

/** Creation: a blank document and its first section are ready to edit */
export const trackDocumentCreated = (isGuest: boolean) =>
  track('document_created', { storage_mode: isGuest ? 'guest' : 'account' });

/** Creation: a template has been applied to a new document */
export const trackTemplateApplied = (documentType: string) => track('template_applied', { document_type: documentType });

/** Activation: a connector reached the "active" status */
export const trackToolConnected = (provider: string) => track('connect_tool', { tool: provider });

const trackedPlans = new Set<string>();
/** Activation: an AI plan was generated (once per planning job) */
export function trackPlanGenerated(jobId: string): void {
  if (trackedPlans.has(jobId)) return;
  trackedPlans.add(jobId);
  track('generate_plan');
}

/** Activation: an AI-generated plan has been inserted into a document */
export const trackGeneratedPlanInserted = () => track('generated_plan_inserted');

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
