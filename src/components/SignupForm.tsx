import React, { useState } from 'react';
import InputField from './InputField';

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onSignupSuccess: (name: string) => void;
}

export default function SignupForm({ onSwitchToLogin, onSignupSuccess }: SignupFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!lastName.trim()) newErrors.lastName = 'Le nom est requis';

    if (!email) {
      newErrors.email = 'L\'adresse email est requise';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'L\'adresse email n\'est pas valide';
    }

    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!agreeTerms) {
      newErrors.terms = 'Vous devez accepter les conditions pour continuer';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSignupSuccess(firstName);
    }, 1200);
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  return (
    <div className="bg-white border border-slate-100 rounded-[20px] p-12 w-full max-w-[520px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.05),0_20px_25px_-5px_rgba(0,0,0,0.02)] text-center my-10 mx-auto backdrop-blur-md max-sm:p-6 max-sm:my-6 max-sm:rounded-2xl animate-fade-in">
      {/* Brand Logo inside the card */}
      <div className="inline-flex items-center gap-2 mb-6 text-brand-green-dark">
        <svg
          className="stroke-brand-green-dark"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
        <span className="font-brand text-[1.15rem] font-medium tracking-tight">MemoFlow</span>
      </div>

      <h1 className="font-brand text-[1.5rem] font-medium text-slate-800 mb-2 tracking-tight max-sm:text-xl">Commencer l'aventure MemoFlow</h1>
      <p className="font-sans text-[0.85rem] text-slate-500 mb-9">Structurez votre pensée, libérez votre potentiel</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-4 w-full max-sm:grid-cols-1 max-sm:gap-0">
          <InputField
            label="Prénom"
            type="text"
            id="signup-firstname"
            placeholder="Jean"
            value={firstName}
            onChange={(val) => {
              setFirstName(val);
              clearError('firstName');
            }}
            error={errors.firstName}
          />
          <InputField
            label="Nom"
            type="text"
            id="signup-lastname"
            placeholder="Dupont"
            value={lastName}
            onChange={(val) => {
              setLastName(val);
              clearError('lastName');
            }}
            error={errors.lastName}
          />
        </div>

        <InputField
          label="Email"
          type="email"
          id="signup-email"
          placeholder="jean.dupont@universite.fr"
          value={email}
          onChange={(val) => {
            setEmail(val);
            clearError('email');
          }}
          error={errors.email}
        />

        <div className="mb-3">
          <InputField
            label="Mot de passe"
            type="password"
            id="signup-password"
            placeholder="********"
            value={password}
            onChange={(val) => {
              setPassword(val);
              clearError('password');
            }}
            error={errors.password}
          />
          <span className="block text-left font-sans text-[0.75rem] text-slate-400 -mt-[0.85rem] mb-5">Saisissez un mot de passe</span>
        </div>

        {/* Terms checkbox */}
        <div className="flex flex-col items-start text-left mb-6 w-full">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              className="accent-brand-green w-[1.1rem] h-[1.1rem] rounded border-slate-200 mt-[0.15rem]"
              checked={agreeTerms}
              onChange={(e) => {
                setAgreeTerms(e.target.checked);
                clearError('terms');
              }}
            />
            <span className="font-sans text-[0.8rem] text-slate-500 leading-normal">
              J'accepte les{' '}
              <a
                href="#terms-of-service"
                className="text-brand-green-dark underline"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Conditions d\'utilisation à afficher.');
                }}
              >
                conditions d'utilisation
              </a>{' '}
              et la{' '}
              <a
                href="#privacy-policy"
                className="text-brand-green-dark underline"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Politique de confidentialité à afficher.');
                }}
              >
                politique de confidentialité
              </a>
              .
            </span>
          </label>
          {errors.terms && (
            <span className="text-[0.75rem] text-red-500 mt-1 pl-[1.85rem]" role="alert">
              {errors.terms}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-brand-green text-brand-green-dark border-none rounded-xl p-3.5 font-sans text-[0.95rem] font-medium cursor-pointer mt-2 flex items-center justify-center shadow-sm hover:bg-brand-green-hover hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          disabled={isLoading}
        >
          {isLoading ? <span className="w-5 h-5 border-2 border-brand-green-dark/25 border-t-brand-green-dark rounded-full animate-spin"></span> : 'Créer mon compte'}
        </button>
      </form>

      <p className="mt-7 font-sans text-[0.85rem] text-slate-500">
        Déjà un compte ?{' '}
        <button
          type="button"
          className="bg-none border-none text-brand-green-dark font-brand text-[0.85rem] font-semibold cursor-pointer p-0 hover:underline"
          onClick={onSwitchToLogin}
        >
          Se connecter
        </button>
      </p>
    </div>
  );
}
