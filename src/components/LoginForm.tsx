import React, { useState } from 'react';
import InputField from './InputField';
import { apiFetch, setToken } from '../services/api';
import type { UserResponseDto } from '../services/api';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onLoginSuccess: (email: string, displayName: string) => void;
}

export default function LoginForm({ onSwitchToSignup, onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    // Basic email validation
    if (!email) {
      setEmailError('L\'adresse email est requise');
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('L\'adresse email n\'est pas valide');
      hasError = true;
    } else {
      setEmailError('');
    }

    // Basic password validation
    if (!password) {
      setPasswordError('Le mot de passe est requis');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) return;

    setIsLoading(true);
    setGeneralError('');

    try {
      // 1. Authenticate to get a JWT token
      const res = await apiFetch<{ accessToken: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setToken(res.accessToken);

      // 2. Load the actual authenticated user details
      const user = await apiFetch<UserResponseDto>('/users/me');
      
      setIsLoading(false);
      onLoginSuccess(user.email, user.display_name);
    } catch (err: unknown) {
      setIsLoading(false);
      const errMsg = err instanceof Error ? err.message : 'Identifiants invalides ou serveur indisponible.';
      setGeneralError(errMsg);
    }
  };


  const forgotPasswordLink = (
    <a
      href="#forgot-password"
      className="font-mono text-[0.75rem] text-brand-green-dark font-medium hover:underline"
      onClick={(e) => {
        e.preventDefault();
        alert('Fonctionnalité de réinitialisation de mot de passe à implémenter.');
      }}
    >
      Mot de passe oublié ?
    </a>
  );

  return (
    <div className="bg-white border border-slate-100 rounded-[20px] p-12 w-full max-w-[520px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.05),0_20px_25px_-5px_rgba(0,0,0,0.02)] text-center my-10 mx-auto backdrop-blur-md max-sm:p-6 max-sm:my-6 max-sm:rounded-2xl animate-fade-in">
      <h1 className="font-brand text-[2rem] font-medium text-slate-800 mb-2 tracking-tight max-sm:text-2xl">Bon retour parmi nous</h1>
      <p className="font-sans text-[0.9rem] text-slate-500 mb-10">Continuez votre voyage académique</p>

      {generalError && (
        <div className="mb-6 p-3.5 bg-[#FCEBEB] border border-[#E24B4A]/25 text-[#E24B4A] rounded-xl text-[0.8rem] font-sans text-left font-medium animate-fade-in">
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
        <InputField
          label="Email"
          type="email"
          id="login-email"
          placeholder="nom@institution.edu"
          value={email}
          onChange={(val) => {
            setEmail(val);
            if (emailError) setEmailError('');
          }}
          error={emailError}
        />

        <InputField
          label="Mot de passe"
          type="password"
          id="login-password"
          placeholder="********"
          value={password}
          onChange={(val) => {
            setPassword(val);
            if (passwordError) setPasswordError('');
          }}
          error={passwordError}
          labelRight={forgotPasswordLink}
        />

        <button
          type="submit"
          className="w-full bg-brand-green text-brand-green-dark border-none rounded-xl p-3.5 font-sans text-[0.95rem] font-medium cursor-pointer mt-3 flex items-center justify-center shadow-sm hover:bg-brand-green-hover hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-brand-green-dark/25 border-t-brand-green-dark rounded-full animate-spin"></span>
          ) : (
            'Se connecter'
          )}
        </button>
      </form>

      <p className="mt-8 font-sans text-[0.85rem] text-slate-500">
        Pas encore de compte ?{' '}
        <button
          type="button"
          className="bg-none border-none text-brand-green-dark font-brand text-[0.85rem] font-semibold cursor-pointer p-0 hover:underline"
          onClick={onSwitchToSignup}
        >
          S'inscrire
        </button>
      </p>
    </div>
  );
}
