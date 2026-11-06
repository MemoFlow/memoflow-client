import { useEffect, useState } from 'react';
import { ApiError } from '../services/api';
import { getResendAvailableAt, markVerificationEmailSent, resendVerificationEmail } from '../services/authEmail';

interface EmailVerificationBannerProps {
  email: string;
  /** 'bar': full-width banner at the top of the app; 'card': inline block (verify page) */
  variant?: 'bar' | 'card';
}

/** Shown while GET /users/me returns email_verified: false, with a resend button. */
export default function EmailVerificationBanner({ email, variant = 'bar' }: EmailVerificationBannerProps) {
  const [availableAt, setAvailableAt] = useState(() => getResendAvailableAt(email));
  const [now, setNow] = useState(() => Date.now());
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);

  const remainingMs = availableAt - now;

  // Tick while the cooldown runs, to update the "dans N min" label
  useEffect(() => {
    if (remainingMs <= 0) return;
    const timer = window.setInterval(() => setNow(Date.now()), 10_000);
    return () => window.clearInterval(timer);
  }, [remainingMs]);

  const handleResend = async () => {
    setIsSending(true);
    setMessage(null);
    try {
      await resendVerificationEmail(email);
      setMessage({ kind: 'ok', text: "Si votre adresse doit encore être confirmée, nous venons d'envoyer un nouveau lien." });
    } catch (err) {
      if (err instanceof ApiError && err.statusCode === 429) {
        markVerificationEmailSent(email);
        setMessage({ kind: 'error', text: 'Trop de demandes. Réessayez dans quelques minutes.' });
      } else {
        setMessage({ kind: 'error', text: err instanceof ApiError ? err.message : "L'email n'a pas pu être renvoyé." });
      }
    } finally {
      setAvailableAt(getResendAvailableAt(email));
      setNow(Date.now());
      setIsSending(false);
    }
  };

  const minutesLeft = Math.ceil(remainingMs / 60_000);
  const button = (
    <button
      type="button"
      onClick={() => void handleResend()}
      disabled={isSending || remainingMs > 0}
      className="px-3 py-1.5 rounded-lg text-[0.75rem] font-bold bg-[#2F4858] hover:bg-[#3E6976] text-white border-none cursor-pointer transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSending ? 'Envoi…' : remainingMs > 0 ? `Renvoyer l'email (dans ${minutesLeft} min)` : "Renvoyer l'email"}
    </button>
  );
  const feedback = message && (
    <p role="status" className={`text-[0.75rem] m-0 ${message.kind === 'error' ? 'text-red-600' : 'text-[#3E6976]'}`}>
      {message.text}
    </p>
  );

  if (variant === 'card') {
    return (
      <div className="flex flex-col items-center gap-2">
        {button}
        {feedback}
      </div>
    );
  }

  return (
    <div className="flex-shrink-0 flex items-center justify-between gap-4 px-8 py-2.5 bg-[#EAF3DE] border-b border-[#94D2B8]/50 text-[#2F4858] max-sm:px-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
      <div className="flex flex-col gap-0.5">
        <p className="text-[0.8rem] font-semibold leading-snug m-0">
          Confirmez votre adresse email : cliquez sur le lien envoyé à <span className="break-all">{email}</span>. Les
          connecteurs et l'assistant IA le demandent.
        </p>
        {feedback}
      </div>
      <div className="flex-shrink-0">{button}</div>
    </div>
  );
}
