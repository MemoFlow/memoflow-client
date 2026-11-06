import React, { useState } from 'react';
import InputField from './InputField';
import { apiFetch } from '../services/api';
import { rememberSignupConsent } from '../services/onboarding';
import { markVerificationEmailSent } from '../services/authEmail';

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export default function SignupForm({
  onSwitchToLogin,
  onOpenPrivacy,
  onOpenTerms,
}: SignupFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  // Optional marketing consent, never pre-ticked
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  // Address the confirmation email was sent to (registration accepted)
  const [sentTo, setSentTo] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
    } else if (password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
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
    setGeneralError('');

    try {
      const displayName = `${firstName.trim()} ${lastName.trim()}`;

      const cleanEmail = email.trim();

      // The API answers 202 with the same body whether or not the address already has
      // an account (emails are unique): it sends either a verification email or an
      // "you already have an account" email. So no automatic login here.
      await apiFetch<{ message: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: cleanEmail,
          password,
          display_name: displayName,
        }),
      });

      // Not accepted by /auth/register: sent later with the questionnaire
      rememberSignupConsent(cleanEmail, agreeMarketing);
      // A verification email just went out: a resend in the next 5 minutes sends nothing
      markVerificationEmailSent(cleanEmail);

      setIsLoading(false);
      setSentTo(cleanEmail);
    } catch (err: unknown) {
      setIsLoading(false);
      const errMsg = err instanceof Error ? err.message : 'L\'inscription a échoué. Veuillez réessayer.';
      setGeneralError(errMsg);
    }
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


  if (sentTo) {
    return (
      <div className="bg-white border border-slate-100 rounded-[20px] p-12 w-full max-w-[520px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.05),0_20px_25px_-5px_rgba(0,0,0,0.02)] text-center my-10 mx-auto max-sm:p-6 max-sm:my-6 max-sm:rounded-2xl animate-fade-in">
        <h1 className="font-brand text-[1.5rem] font-medium text-slate-800 mb-3 tracking-tight max-sm:text-xl">
          Vérifiez votre boîte mail
        </h1>
        <p className="font-sans text-[0.9rem] text-slate-600 leading-relaxed mb-2">
          Nous avons envoyé un email à <strong className="text-slate-800 break-all">{sentTo}</strong>.
        </p>
        <p className="font-sans text-[0.85rem] text-slate-500 leading-relaxed mb-8">
          Vous pouvez vous connecter dès maintenant. Pensez à confirmer votre adresse avec le lien reçu (valable
          24 heures) : les connecteurs et l'assistant IA le demandent. Si cette adresse a déjà un compte MemoFlow,
          l'email vous l'indique et vous permet de choisir un nouveau mot de passe.
        </p>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="w-full bg-brand-green text-brand-green-dark border-none rounded-xl p-3.5 font-sans text-[0.95rem] font-medium cursor-pointer shadow-sm hover:bg-brand-green-hover transition-all"
        >
          Se connecter
        </button>
        <p className="mt-6 font-sans text-[0.8rem] text-slate-400">
          Rien reçu ? Vérifiez vos courriers indésirables.
        </p>
      </div>
    );
  }

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

      {generalError && (
        <div className="mb-6 p-3.5 bg-[#FCEBEB] border border-[#E24B4A]/25 text-[#E24B4A] rounded-xl text-[0.8rem] font-sans text-left font-medium animate-fade-in">
          {generalError}
        </div>
      )}

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
              <button
                type="button"
                className="text-brand-green-dark underline bg-transparent border-none p-0 cursor-pointer font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenTerms?.();
                }}
              >
                conditions d'utilisation
              </button>{' '}
              et la{' '}
              <button
                type="button"
                className="text-brand-green-dark underline bg-transparent border-none p-0 cursor-pointer font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenPrivacy?.();
                }}
              >
                politique de confidentialité
              </button>
              .
            </span>
          </label>
          {errors.terms && (
            <span className="text-[0.75rem] text-red-500 mt-1 pl-[1.85rem]" role="alert">
              {errors.terms}
            </span>
          )}

          <label className="flex items-start gap-3 cursor-pointer select-none mt-3">
            <input
              type="checkbox"
              className="accent-brand-green w-[1.1rem] h-[1.1rem] rounded border-slate-200 mt-[0.15rem]"
              checked={agreeMarketing}
              onChange={(e) => setAgreeMarketing(e.target.checked)}
            />
            <span className="font-sans text-[0.8rem] text-slate-500 leading-normal">
              J'accepte d'être contacté(e) par email par MemoFlow (conseils de méthodologie, offres). Facultatif,
              modifiable à tout moment dans les paramètres.
            </span>
          </label>
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
