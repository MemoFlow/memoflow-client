import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import ConsentBanner from './components/ConsentBanner';
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
import { ROUTES, isAppPath, matchRoute, navigate, usePath } from './services/router';
import './App.css';

const SESSION_EXPIRED_NOTICE = 'Votre session a expiré. Reconnectez-vous pour continuer.';
const PASSWORD_CHANGED_NOTICE = 'Mot de passe modifié. Connectez-vous avec votre nouveau mot de passe.';

/** First app page after login (or when a logged-in user opens /connexion) */
const defaultAppPath = (user: UserResponseDto | null) => (user ? ROUTES.templates : ROUTES.writing);

function App() {
  const path = usePath();
  // Message shown above the login form (session expired, password changed…)
  const [loginNotice, setLoginNotice] = useState<string | null>(null);
  // Page to come back to after logging in (e.g. /admin, or the page where the session expired)
  const [returnTo, setReturnTo] = useState<string | null>(null);
  // null = guest (no account, nothing is saved)
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  // First connection: 'Personnalise ton espace' questionnaire
  const [showOnboarding, setShowOnboarding] = useState(false);

  /** Opens the login page, coming back to `from` afterwards */
  const goToLogin = useCallback((from: string | null = null, notice: string | null = null) => {
    setReturnTo(from);
    setLoginNotice(notice);
    navigate(ROUTES.login);
  }, []);

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

  // Restore session on mount; without a token the visitor browses as a guest
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

  // Global logout: explicit logout -> home page; token rejected (401) -> login page
  useEffect(() => {
    const handleLogoutEvent = (event: Event) => {
      const reason = (event as CustomEvent<LogoutReason>).detail;
      disconnectSocket();
      setUser(null);
      setShowOnboarding(false);
      if (reason === 'expired') {
        const here = window.location.pathname;
        goToLogin(isAppPath(here) || here === ROUTES.admin ? here : null, SESSION_EXPIRED_NOTICE);
      } else {
        navigate(ROUTES.home);
      }
    };

    window.addEventListener('auth_logout', handleLogoutEvent);
    return () => window.removeEventListener('auth_logout', handleLogoutEvent);
  }, [goToLogin]);

  // Logged in on /connexion or /inscription: go to the requested page or the app
  useEffect(() => {
    if (!user || (path !== ROUTES.login && path !== ROUTES.signup)) return;
    navigate(returnTo ?? defaultAppPath(user), { replace: true });
  }, [user, path, returnTo]);

  // Unknown URL: back to the home page
  const isUnknownPath = matchRoute(path) === null;
  useEffect(() => {
    if (isUnknownPath) navigate(ROUTES.home, { replace: true });
  }, [isUnknownPath]);

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
      await loadCurrentUser(); // the effect above then leaves /connexion
      setLoginNotice(null);
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
    goToLogin(null, PASSWORD_CHANGED_NOTICE);
  };

  const privacyModal = (
    <PrivacyDataModal
      key={privacyModalTab}
      isOpen={isPrivacyModalOpen}
      onClose={() => setIsPrivacyModalOpen(false)}
      initialTab={privacyModalTab}
    />
  );

  // Shared by every page: privacy modal + analytics consent banner
  const withOverlays = (page: ReactNode) => (
    <>
      {page}
      {privacyModal}
      <ConsentBanner onOpenPrivacy={() => handleOpenPrivacy('third-parties')} />
    </>
  );

  /** Header + centered card + footer, shared by login, signup and the email-link pages */
  const authLayout = (content: ReactNode, showGuestLink = false) =>
    withOverlays(
      <div className="flex flex-col min-h-screen w-full">
        <Header />

        <main className="flex-1 flex flex-col items-center justify-center px-4 w-full">
          {content}

          {showGuestLink && (
            <button
              type="button"
              onClick={() => navigate(ROUTES.writing)}
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
  if (path === ROUTES.verifyEmail) {
    return authLayout(
      <VerifyEmailPage
        user={user}
        onVerified={() => void refreshUser()}
        onContinue={() => navigate(defaultAppPath(user))}
        onLogin={() => goToLogin()}
      />
    );
  }

  if (path === ROUTES.resetPassword) {
    return authLayout(
      <ResetPasswordPage onDone={handlePasswordChanged} onRequestNewLink={() => navigate(ROUTES.forgotPassword)} />
    );
  }

  if (path === ROUTES.forgotPassword) {
    return authLayout(<ForgotPasswordPage onBackToLogin={() => goToLogin()} />);
  }

  // ─── Login / signup ────────────────────────────────────────────────────────
  if (path === ROUTES.login) {
    return authLayout(
      <LoginForm
        notice={loginNotice}
        onSwitchToSignup={() => navigate(ROUTES.signup)}
        onForgotPassword={() => navigate(ROUTES.forgotPassword)}
        onLoginSuccess={handleAuthSuccess}
      />,
      true
    );
  }

  if (path === ROUTES.signup) {
    return authLayout(
      <SignupForm
        onSwitchToLogin={() => goToLogin(returnTo)}
        onOpenPrivacy={() => handleOpenPrivacy('overview')}
        onOpenTerms={() => handleOpenPrivacy('terms')}
      />,
      true
    );
  }

  // ─── Admin ─────────────────────────────────────────────────────────────────
  if (path === ROUTES.admin) {
    return withOverlays(
      <AdminPage
        key={user?.id ?? 'guest'}
        user={user}
        onRequestLogin={() => goToLogin(ROUTES.admin)}
        onBackToApp={() => navigate(defaultAppPath(user))}
        onLogout={handleLogout}
      />
    );
  }

  // ─── App pages ─────────────────────────────────────────────────────────────
  if (isAppPath(path)) {
    if (user && showOnboarding) {
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

    return withOverlays(
      <Dashboard
        // Remount on identity change so every page refetches its data
        key={user?.id ?? 'guest'}
        path={path}
        user={user}
        userName={user?.display_name || GUEST_DISPLAY_NAME}
        onLogout={handleLogout}
        onRequestLogin={() => goToLogin(path)}
        onRequestSignup={() => {
          setReturnTo(path);
          navigate(ROUTES.signup);
        }}
        onOpenPrivacy={() => handleOpenPrivacy('overview')}
        onOpenTerms={() => handleOpenPrivacy('terms')}
      />
    );
  }

  // ─── Home (landing page) ───────────────────────────────────────────────────
  return withOverlays(
    <LandingPage
      isLoggedIn={user !== null}
      onOpenPrivacy={() => handleOpenPrivacy('overview')}
      onOpenTerms={() => handleOpenPrivacy('terms')}
    />
  );
}

export default App;
