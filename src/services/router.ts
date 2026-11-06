import { useSyncExternalStore } from 'react';

/**
 * Minimal path-based router (no dependency). Every page has its own URL so it can be
 * bookmarked, shared, opened in a new tab and measured by analytics.
 * Production hosting must serve index.html for every path (see vercel.json).
 */
export const ROUTES = {
  home: '/',
  login: '/connexion',
  signup: '/inscription',
  forgotPassword: '/mot-de-passe-oublie',
  // Fixed by the API: links sent by email
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
  admin: '/admin',
  // App pages
  progression: '/ma-progression',
  templates: '/modeles',
  writing: '/espace-ecriture',
  context: '/centre-de-contexte',
  connectors: '/centre-de-contexte/connecteurs',
  settings: '/parametres',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

const TITLES: Record<RoutePath, string> = {
  '/': 'MemoFlow · Rédigez votre mémoire sans repartir de zéro',
  '/connexion': 'Connexion · MemoFlow',
  '/inscription': 'Créer un compte · MemoFlow',
  '/mot-de-passe-oublie': 'Mot de passe oublié · MemoFlow',
  '/reset-password': 'Nouveau mot de passe · MemoFlow',
  '/verify-email': 'Confirmation de l’adresse email · MemoFlow',
  '/admin': 'Administration · MemoFlow',
  '/ma-progression': 'Ma progression · MemoFlow',
  '/modeles': 'Modèles · MemoFlow',
  '/espace-ecriture': 'Espace d’écriture · MemoFlow',
  '/centre-de-contexte': 'Centre de contexte · MemoFlow',
  '/centre-de-contexte/connecteurs': 'Connecteurs · MemoFlow',
  '/parametres': 'Paramètres · MemoFlow',
};

const KNOWN_PATHS = new Set<string>(Object.values(ROUTES));

export const APP_PATHS: readonly RoutePath[] = [
  ROUTES.progression,
  ROUTES.templates,
  ROUTES.writing,
  ROUTES.context,
  ROUTES.connectors,
  ROUTES.settings,
];

const normalize = (pathname: string) => pathname.replace(/\/+$/, '') || '/';

/** Known route for a pathname, or null for an unknown URL */
export function matchRoute(pathname: string): RoutePath | null {
  const path = normalize(pathname);
  return KNOWN_PATHS.has(path) ? (path as RoutePath) : null;
}

export const isAppPath = (path: string) => (APP_PATHS as readonly string[]).includes(path);

function applyTitle(pathname: string) {
  const route = matchRoute(pathname);
  if (route) document.title = TITLES[route];
}

// ─── Store ───────────────────────────────────────────────────────────────────
const listeners = new Set<() => void>();
const emit = () => {
  applyTitle(window.location.pathname);
  listeners.forEach((listener) => listener());
};

window.addEventListener('popstate', emit);
applyTitle(window.location.pathname);

/**
 * Changes the URL without reloading. The title is set before the history change so
 * Google Analytics (page views on browser history changes) records the right title.
 */
export function navigate(to: string, { replace = false }: { replace?: boolean } = {}): void {
  const current = window.location.pathname + window.location.search + window.location.hash;
  if (to === current) return;
  applyTitle(to.split(/[?#]/)[0]);
  if (replace) window.history.replaceState(null, '', to);
  else window.history.pushState(null, '', to);
  if (!replace) window.scrollTo(0, 0);
  emit();
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Current normalized pathname; re-renders on navigate() and back/forward */
export function usePath(): string {
  return useSyncExternalStore(subscribe, () => normalize(window.location.pathname));
}
