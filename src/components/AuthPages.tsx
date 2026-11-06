import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import InputField from './InputField';
import { apiFetch, ApiError, isDeadLinkError } from '../services/api';
import type { UserResponseDto } from '../services/api';
import { requestPasswordReset, resetPassword, takeTokenFromUrl, verifyEmail } from '../services/authEmail';
import EmailVerificationBanner from './EmailVerificationBanner';

// ─── Layout pieces (same look as the login / signup cards) ───────────────────
const cardClass =
  'bg-white border border-slate-100 rounded-[20px] p-12 w-full max-w-[520px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_10px_15px_-3px_rgba(0,0,0,0.05),0_20px_25px_-5px_rgba(0,0,0,0.02)] text-center my-10 mx-auto max-sm:p-6 max-sm:my-6 max-sm:rounded-2xl animate-fade-in';
const primaryBtn =
  'w-full bg-brand-green text-brand-green-dark border-none rounded-xl p-3.5 font-sans text-[0.95rem] font-medium cursor-pointer mt-2 flex items-center justify-center shadow-sm hover:bg-brand-green-hover disabled:opacity-70 disabled:cursor-not-allowed transition-all';
const linkBtn =
  'bg-transparent border-none text-brand-green-dark font-brand text-[0.85rem] font-semibold cursor-pointer p-0 hover:underline';

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={cardClass}>
      <h1 className="font-brand text-[1.6rem] font-medium text-slate-800 mb-3 tracking-tight max-sm:text-xl">{title}</h1>
      {children}
    </div>
  );
}

function Text({ children }: { children: ReactNode }) {
  return <p className="font-sans text-[0.88rem] text-slate-600 leading-relaxed mb-6">{children}</p>;
}

function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div
      role="alert"
      className="mb-6 p-3.5 bg-[#FCEBEB] border border-[#E24B4A]/25 text-[#E24B4A] rounded-xl text-[0.8rem] font-sans text-left font-medium"
    >
      {children}
    </div>
  );
}

function Spinner() {
  return <span className="w-5 h-5 border-2 border-brand-green-dark/25 border-t-brand-green-dark rounded-full animate-spin" />;
}

const errorText = (err: unknown) =>
  err instanceof ApiError ? err.message : 'Une erreur inattendue est survenue. Réessayez.';

// ─── /forgot-password ────────────────────────────────────────────────────────
export function ForgotPasswordPage({ onBackToLogin }: { onBackToLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const clean = email.trim();
    if (!clean) return setEmailError("L'adresse email est requise");
    if (!/\S+@\S+\.\S+/.test(clean)) return setEmailError("L'adresse email n'est pas valide");

    setIsLoading(true);
    setError('');
    try {
      await requestPasswordReset(clean);
      setSent(true); // same answer whether or not the account exists
    } catch (err) {
      setError(errorText(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (sent) {
    return (
      <Card title="Vérifiez votre boîte mail">
        <Text>
          Si cette adresse a un compte MemoFlow, nous venons d'y envoyer un lien pour choisir un nouveau mot de passe. Il
          est valable 1 heure. Pensez à regarder vos courriers indésirables.
        </Text>
        <button type="button" className={primaryBtn} onClick={onBackToLogin}>
          Retour à la connexion
        </button>
      </Card>
    );
  }

  return (
    <Card title="Mot de passe oublié">
      <Text>Saisissez l'adresse email de votre compte : nous vous enverrons un lien pour choisir un nouveau mot de passe.</Text>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
        <InputField
          label="Email"
          type="email"
          id="forgot-email"
          placeholder="nom@institution.edu"
          value={email}
          onChange={(val) => {
            setEmail(val);
            setEmailError('');
          }}
          error={emailError}
        />
        <button type="submit" className={primaryBtn} disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Envoyer le lien'}
        </button>
      </form>
      <p className="mt-7 font-sans text-[0.85rem] text-slate-500">
        <button type="button" className={linkBtn} onClick={onBackToLogin}>
          Retour à la connexion
        </button>
      </p>
    </Card>
  );
}

// ─── /reset-password#token=… ─────────────────────────────────────────────────
interface ResetPasswordPageProps {
  /** Password changed: every session is now invalid, the user must log in again */
  onDone: () => void;
  onRequestNewLink: () => void;
}

export function ResetPasswordPage({ onDone, onRequestNewLink }: ResetPasswordPageProps) {
  const [token] = useState(takeTokenFromUrl);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ password?: string; confirm?: string }>({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeadLink, setIsDeadLink] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    // Passwords are never trimmed; the only rule is 8 characters minimum
    const errors: typeof fieldErrors = {};
    if (password.length < 8) errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    if (confirm !== password) errors.confirm = 'Les deux mots de passe ne correspondent pas';
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);
    setError('');
    try {
      await resetPassword(token, password);
      onDone();
    } catch (err) {
      if (isDeadLinkError(err)) setIsDeadLink(true);
      else setError(errorText(err)); // validation, 429 or 500: the link is not spent, form values are kept
      setIsLoading(false);
    }
  };

  if (!token || isDeadLink) {
    return (
      <Card title="Ce lien n'est plus valide">
        <Text>
          Le lien a peut-être expiré (il est valable 1 heure), a déjà été utilisé ou est incomplet. Demandez-en un nouveau.
        </Text>
        <button type="button" className={primaryBtn} onClick={onRequestNewLink}>
          Demander un nouveau lien
        </button>
      </Card>
    );
  }

  return (
    <Card title="Nouveau mot de passe">
      <Text>Choisissez un nouveau mot de passe d'au moins 8 caractères. Vous serez ensuite déconnecté de tous vos appareils.</Text>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
        <InputField
          label="Nouveau mot de passe"
          type="password"
          id="reset-password"
          placeholder="********"
          value={password}
          onChange={(val) => {
            setPassword(val);
            setFieldErrors((f) => ({ ...f, password: undefined }));
          }}
          error={fieldErrors.password}
        />
        <InputField
          label="Confirmer le mot de passe"
          type="password"
          id="reset-password-confirm"
          placeholder="********"
          value={confirm}
          onChange={(val) => {
            setConfirm(val);
            setFieldErrors((f) => ({ ...f, confirm: undefined }));
          }}
          error={fieldErrors.confirm}
        />
        <button type="submit" className={primaryBtn} disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Changer le mot de passe'}
        </button>
      </form>
    </Card>
  );
}

// ─── /verify-email#token=… ───────────────────────────────────────────────────
type VerifyState = 'verifying' | 'success' | 'already' | 'dead' | 'rate-limited' | 'error';

interface VerifyEmailPageProps {
  /** null when logged out (the link also works logged out or on another device) */
  user: UserResponseDto | null;
  onVerified: () => void;
  onContinue: () => void;
  onLogin: () => void;
}

export function VerifyEmailPage({ user, onVerified, onContinue, onLogin }: VerifyEmailPageProps) {
  const [token] = useState(takeTokenFromUrl);
  const [state, setState] = useState<VerifyState>('verifying');
  const isLoggedIn = user !== null;

  // State is only set after an await: the first call comes from an effect
  const runVerification = useCallback(
    async (t: string) => {
      try {
        await verifyEmail(t);
        setState('success');
        onVerified();
      } catch (err) {
        if (err instanceof ApiError && err.statusCode === 429) return setState('rate-limited');
        if (!(err instanceof ApiError && err.statusCode === 400)) return setState('error');
        // Same 400 for a bad link and for a link already used: ask /users/me when logged in
        if (!isLoggedIn) return setState('dead');
        try {
          const me = await apiFetch<UserResponseDto>('/users/me');
          setState(me.email_verified ? 'already' : 'dead');
        } catch {
          setState('dead');
        }
      }
    },
    [isLoggedIn, onVerified]
  );

  // A token works once: send a single request, even under React StrictMode
  const started = useRef(false);
  useEffect(() => {
    if (!token || started.current) return;
    started.current = true;
    void runVerification(token);
  }, [token, runVerification]);

  const retry = () => {
    if (!token) return;
    setState('verifying');
    void runVerification(token);
  };

  const continueBtn = (
    <button type="button" className={primaryBtn} onClick={isLoggedIn ? onContinue : onLogin}>
      {isLoggedIn ? 'Continuer vers MemoFlow' : 'Se connecter'}
    </button>
  );

  if (!token || state === 'dead') {
    return (
      <Card title="Ce lien n'est plus valide">
        {isLoggedIn ? (
          <>
            <Text>Le lien a peut-être expiré (il est valable 24 heures) ou est incomplet. Demandez un nouvel email :</Text>
            <EmailVerificationBanner email={user.email} variant="card" />
            <div className="mt-6">{continueBtn}</div>
          </>
        ) : (
          <>
            <Text>Le lien a peut-être expiré (il est valable 24 heures) ou est incomplet. Connectez-vous pour en demander un nouveau.</Text>
            {continueBtn}
          </>
        )}
      </Card>
    );
  }

  switch (state) {
    case 'verifying':
      return (
        <Card title="Confirmation en cours…">
          <div className="flex justify-center py-4">
            <Spinner />
          </div>
        </Card>
      );
    case 'success':
      return (
        <Card title="Adresse email confirmée">
          <Text>Merci ! Votre adresse est confirmée, toutes les fonctionnalités de MemoFlow vous sont ouvertes.</Text>
          {continueBtn}
        </Card>
      );
    case 'already':
      return (
        <Card title="Adresse déjà confirmée">
          <Text>Votre adresse email est déjà confirmée : vous n'avez rien d'autre à faire.</Text>
          {continueBtn}
        </Card>
      );
    case 'rate-limited':
    case 'error':
      return (
        <Card title="La confirmation n'a pas abouti">
          <Text>
            {state === 'rate-limited'
              ? 'Trop de tentatives. Patientez une minute, puis réessayez.'
              : 'Le serveur MemoFlow ne répond pas pour le moment. Réessayez dans quelques instants.'}
          </Text>
          <button type="button" className={primaryBtn} onClick={retry}>
            Réessayer
          </button>
        </Card>
      );
  }
}
