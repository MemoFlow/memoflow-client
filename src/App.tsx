import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import PrivacyDataModal from './components/PrivacyDataModal';
import OnboardingFlow from './components/OnboardingFlow';
import AdminPage from './components/AdminPage';
import BrandLogo from './components/BrandLogo';
import { ForgotPasswordPage, ResetPasswordPage, VerifyEmailPage } from './components/AuthPages';
import type { PrivacyModalTab } from './components/PrivacyDataModal';
import {
  getToken,
  clearToken,
  apiFetch,
  disconnectSocket,
  GUEST_DISPLAY_NAME,
  EMAIL_NOT_VERIFIED_EVENT,
} from './services/api';
import type { LogoutReason, UserResponseDto } from './services/api';
import { needsOnboarding } from './services/onboarding';
import './App.css';

type View = 'app' | 'login' | 'signup';

/**
 * No router: a few pages are addressed by path, read on load and on back/forward.
 * /reset-password and /verify-email are fixed by the API (links in emails) and must
 * load directly, so the host has to serve index.html for every path.
 */
const ROUTES = ['/admin', '/forgot-password', '/reset-password', '/verify-email', '/inscription'] as const;
type Route = (typeof ROUTES)[number] | '/';

const currentRoute = (): Route => {
  const path = window.location.pathname.replace(/\/+$/, '');
  return (ROUTES as readonly string[]).includes(path) ? (path as Route) : '/';
};

const SESSION_EXPIRED_NOTICE = 'Votre session a expiré. Reconnectez-vous pour continuer.';
const PASSWORD_CHANGED_NOTICE = 'Mot de passe modifié. Connectez-vous avec votre nouveau mot de passe.';

function App() {
  // /inscription (CTA du blog) ouvre le formulaire d'inscription ; un compte restauré repasse sur l'app
  const [view, setView] = useState<View>(() => (currentRoute() === '/inscription' ? 'signup' : 'app'));
  const [route, setRoute] = useState<Route>(currentRoute);
  // Message shown above the login form (session expired, password changed…)
  const [loginNotice, setLoginNotice] = useState<string | null>(null);
  // null = guest (no account, nothing is saved)
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  // First connection: 'Personnalise ton espace' questionnaire
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const onPopState = () => setRoute(currentRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path: Route) => {
    window.history.pushState(null, '', path);
    setRoute(currentRoute());
  };

  /** Leaves any path-based page and shows the given view */
  const goTo = (target: View, notice: string | null = null) => {
    if (route !== '/' && route !== '/admin') navigate('/');
    setLoginNotice(notice);
    setView(target);
  };

  // Privacy & Data Inventory Modal state
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [privacyModalTab, setPrivacyModalTab] = useState<PrivacyModalTab>('overview');

  const handleOpenPrivacy = (tab: PrivacyModalTab = 'overview') => {
    setPrivacyModalTab(tab);
    setIsPrivacyModalOpen(true);
  };

  const loadCurrentUser = useCallback(async () => {
    const me = await apiFetch<UserResponseDto>('/users/me');
    // Admins are not leads: no questionnaire. Otherwise re-sends queued answers,
    // then asks GET /onboarding/me (never throws)
    const showQuestionnaire = me.role === 'admin' ? false : await needsOnboarding(me.id);
    setUser(me);
    setShowOnboarding(showQuestionnaire);
    setLoginNotice(null);
    setView('app');
  }, []);

  /** Refreshes the user (e.g. email_verified) without touching the rest of the state */
  const refreshUser = useCallback(async () => {
    if (!getToken()) return;
    try {
      setUser(await apiFetch<UserResponseDto>('/users/me'));
    } catch (err) {
      console.warn('Could not refresh the current user:', err);
    }
  }, []);

  // Restore session on mount; without a token the visitor lands on the app as a guest
  useEffect(() => {
    const initAuth = async () => {
      if (!getToken()) {
        setIsInitializing(false);
        return;
      }
      try {
        await loadCurrentUser();
      } catch (err) {
        console.error('Failed to restore session:', err);
        if (getToken()) clearToken();
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();
  }, [loadCurrentUser]);

  // Global logout: explicit logout -> guest app; token rejected (401) -> login page
  useEffect(() => {
    const handleLogoutEvent = (event: Event) => {
      const reason = (event as CustomEvent<LogoutReason>).detail;
      disconnectSocket();
      setUser(null);
      setShowOnboarding(false);
      if (reason === 'expired') {
        setLoginNotice(SESSION_EXPIRED_NOTICE);
        setView('login');
      } else {
        setView('app');
      }
    };

    window.addEventListener('auth_logout', handleLogoutEvent);
    return () => window.removeEventListener('auth_logout', handleLogoutEvent);
  }, []);

  // A route answered 403 "Email not verified": make sure the verification banner shows
  useEffect(() => {
    const onNotVerified = () => setUser((u) => (u && u.email_verified !== false ? { ...u, email_verified: false } : u));
    window.addEventListener(EMAIL_NOT_VERIFIED_EVENT, onNotVerified);
    return () => window.removeEventListener(EMAIL_NOT_VERIFIED_EVENT, onNotVerified);
  }, []);

  // While unverified, refetch when the tab regains focus (verified in another tab or device)
  const isUnverified = user?.email_verified === false;
  useEffect(() => {
    if (!isUnverified) return;
    const onFocus = () => {
      if (document.visibilityState === 'visible') void refreshUser();
    };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onFocus);
    };
  }, [isUnverified, refreshUser]);

  const handleAuthSuccess = async () => {
    try {
      await loadCurrentUser();
    } catch (err) {
      console.error('Failed to load user after authentication:', err);
    }
  };

  const handleLogout = () => {
    clearToken(); // dispatches 'auth_logout'
  };

  // Password reset: every JWT is now rejected and nothing logs the user in
  const handlePasswordChanged = () => {
    if (getToken()) clearToken();
    goTo('login', PASSWORD_CHANGED_NOTICE);
  };

  const privacyModal = (
    <PrivacyDataModal
      key={privacyModalTab}
      isOpen={isPrivacyModalOpen}
      onClose={() => setIsPrivacyModalOpen(false)}
      initialTab={privacyModalTab}
    />
  );

  /** Header + centered card + footer, shared by login, signup and the email-link pages */
  const authLayout = (content: ReactNode, showGuestLink = false) => (
    <div className="flex flex-col min-h-screen w-full">
      <Header onLogoClick={() => goTo('app')} />

      <main className="flex-1 flex flex-col items-center justify-center px-4 w-full">
        {content}

        {showGuestLink && (
          <button
            type="button"
            onClick={() => goTo('app')}
            className="mb-10 -mt-4 bg-transparent border-none cursor-pointer font-sans text-[0.85rem] text-slate-500 hover:text-brand-green-dark hover:underline"
          >
            Continuer en tant qu'invité (sans sauvegarde)
          </button>
        )}
      </main>

      <Footer
        onOpenPrivacy={() => handleOpenPrivacy('overview')}
        onOpenTerms={() => handleOpenPrivacy('terms')}
      />

      {privacyModal}
    </div>
  );

  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFB]">
        <BrandLogo size={72} className="animate-pulse-slow mb-4" />
        <span className="font-brand font-bold text-xl text-[#2F4858]">Chargement de MemoFlow...</span>
        <div className="w-12 h-1 bg-[#94D2B8]/30 rounded-full mt-4 overflow-hidden relative">
          <div className="absolute inset-0 bg-[#3E6976] animate-infinite-scroll w-1/2 rounded-full"></div>
        </div>
      </div>
    );
  }

  // ─── Pages opened from an email link (work logged in or out) ───────────────
  if (route === '/verify-email') {
    return authLayout(
      <VerifyEmailPage
        user={user}
        onVerified={() => void refreshUser()}
        onContinue={() => goTo('app')}
        onLogin={() => goTo('login')}
      />
    );
  }

  if (route === '/reset-password') {
    return authLayout(
      <ResetPasswordPage onDone={handlePasswordChanged} onRequestNewLink={() => navigate('/forgot-password')} />
    );
  }

  if (route === '/forgot-password') {
    return authLayout(<ForgotPasswordPage onBackToLogin={() => goTo('login')} />);
  }

  // ─── App ───────────────────────────────────────────────────────────────────
  if (view === 'app' && route === '/admin') {
    return (
      <AdminPage
        key={user?.id ?? 'guest'}
        user={user}
        onRequestLogin={() => setView('login')}
        onBackToApp={() => navigate('/')}
        onLogout={handleLogout}
      />
    );
  }

  if (view === 'app' && user && showOnboarding) {
    return (
      <OnboardingFlow
        userId={user.id}
        userName={user.display_name}
        userEmail={user.email}
        onComplete={() => setShowOnboarding(false)}
        onPostpone={() => setShowOnboarding(false)}
      />
    );
  }

  if (view === 'app') {
    return (
      <>
        <Dashboard
          // Remount on identity change so every page refetches its data
          key={user?.id ?? 'guest'}
          user={user}
          userName={user?.display_name || GUEST_DISPLAY_NAME}
          onLogout={handleLogout}
          onRequestLogin={() => goTo('login')}
          onRequestSignup={() => goTo('signup')}
          onOpenPrivacy={() => handleOpenPrivacy('overview')}
          onOpenTerms={() => handleOpenPrivacy('terms')}
        />
        {privacyModal}
      </>
    );
  }

  return authLayout(
    view === 'login' ? (
      <LoginForm
        notice={loginNotice}
        onSwitchToSignup={() => goTo('signup')}
        onForgotPassword={() => navigate('/forgot-password')}
        onLoginSuccess={handleAuthSuccess}
      />
    ) : (
      <SignupForm
        onSwitchToLogin={() => goTo('login')}
        onOpenPrivacy={() => handleOpenPrivacy('overview')}
        onOpenTerms={() => handleOpenPrivacy('terms')}
      />
    ),
    true
  );
}

export default App;
