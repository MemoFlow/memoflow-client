import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';

type AuthView = 'login' | 'signup' | 'success';

function App() {
  const [view, setView] = useState<AuthView>('login');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    // Extrapolate name from email
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    setUserName(formattedName);
    setView('success');
  };

  const handleSignupSuccess = (name: string) => {
    setUserName(name);
    setView('success');
  };

  const handleLogout = () => {
    setView('login');
    setUserEmail('');
    setUserName('');
  };

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

        {view === 'success' && (
          <div className="w-full max-w-[520px] my-10 mx-auto animate-fade-in">
            <div className="bg-white border border-slate-100 rounded-[20px] p-14 text-center backdrop-blur-md flex flex-col items-center max-sm:p-6 max-sm:rounded-2xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.05),0_20px_25px_-5px_rgba(0,0,0,0.02)]">
              <div className="text-brand-green-dark bg-brand-green-light p-4 rounded-full flex items-center justify-center mb-8 shadow-[0_4px_12px_rgba(137,207,174,0.2)]">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              
              <h1 className="font-brand text-[2rem] font-medium text-slate-800 mb-4 max-sm:text-2xl">Bienvenue, {userName} !</h1>
              <p className="font-sans text-[0.95rem] text-slate-500 leading-relaxed mb-6">
                Votre voyage académique sur MemoFlow commence ici. Votre espace est prêt et structuré pour libérer tout votre potentiel.
              </p>
              
              {userEmail && <p className="font-mono text-[0.8rem] text-brand-green-dark bg-brand-green-light px-3 py-1.5 rounded-lg mb-8">Identifiant : {userEmail}</p>}
              
              <button onClick={handleLogout} className="bg-transparent border border-brand-green-dark text-brand-green-dark px-8 py-3 rounded-xl font-sans text-[0.9rem] font-medium cursor-pointer hover:bg-brand-green-light transition-all">
                Se déconnecter
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
