import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import { getToken, clearToken, apiFetch, disconnectSocket } from './services/api';
import type { UserResponseDto } from './services/api';
import './App.css';

type AuthView = 'login' | 'signup' | 'success';

function App() {
  const [view, setView] = useState<AuthView>('login');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);

  // Attempt to restore session on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (!token) {
        setIsInitializing(false);
        return;
      }

      try {
        const user = await apiFetch<UserResponseDto>('/users/me');
        setUserEmail(user.email);
        setUserName(user.display_name);
        setView('success');
      } catch (err) {
        console.error('Failed to restore session:', err);
        clearToken();
        setView('login');
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();
  }, []);

  // Listen for global logout events (triggered by 401 Unauthorized responses)
  useEffect(() => {
    const handleLogoutEvent = () => {
      setView('login');
      setUserEmail('');
      setUserName('');
    };

    window.addEventListener('auth_logout', handleLogoutEvent);
    return () => {
      window.removeEventListener('auth_logout', handleLogoutEvent);
    };
  }, []);

  const handleLoginSuccess = (email: string, displayName: string) => {
    setUserEmail(email);
    setUserName(displayName);
    setView('success');
  };

  const handleSignupSuccess = (email: string, displayName: string) => {
    setUserEmail(email);
    setUserName(displayName);
    setView('success');
  };

  const handleLogout = () => {
    clearToken();
    disconnectSocket();
    setView('login');
    setUserEmail('');
    setUserName('');
  };

  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFB]">
        <div className="bg-[#EAF3DE] p-4 rounded-xl border border-[#94D2B8]/30 flex items-center justify-center animate-pulse-slow mb-4">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="stroke-[#3E6976]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="font-brand font-bold text-xl text-[#2F4858]">Chargement de MemoFlow...</span>
        <div className="w-12 h-1 bg-[#94D2B8]/30 rounded-full mt-4 overflow-hidden relative">
          <div className="absolute inset-0 bg-[#3E6976] animate-infinite-scroll w-1/2 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (view === 'success') {
    return (
      <Dashboard
        userName={userName || 'Utilisateur'}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header onLogoClick={() => setView('login')} />
      
      <main className="flex-1 flex items-center justify-center px-4 w-full">
        {view === 'login' && (
          <LoginForm
            onSwitchToSignup={() => setView('signup')}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
        
        {view === 'signup' && (
          <SignupForm
            onSwitchToLogin={() => setView('login')}
            onSignupSuccess={handleSignupSuccess}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;

