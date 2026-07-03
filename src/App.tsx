import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import './App.css';

type AuthView = 'login' | 'signup' | 'success';

function App() {
  const [view, setView] = useState<AuthView>('success');
  const [userEmail, setUserEmail] = useState('melanie@memoflow.edu');
  const [userName, setUserName] = useState('Mélanie');

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

  if (view === 'success') {
    return (
      <Dashboard
        userName={userName || 'Mélanie'}
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
