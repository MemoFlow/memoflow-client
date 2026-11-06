import { useEffect, useState } from 'react';
import type { UserResponseDto } from '../services/api';
import { ApiError, GUEST_DISPLAY_NAME } from '../services/api';
import { getOnboarding, updateMarketingConsent } from '../services/onboarding';
import { ANALYTICS_ENABLED, setAnalyticsConsent, useAnalyticsConsent } from '../services/analytics';
import Link from './Link';
import { ROUTES } from '../services/router';

interface SettingsPageProps {
  /** null for guests */
  user: UserResponseDto | null;
  onLogout: () => void;
  onRequestLogin: () => void;
  onRequestSignup: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

const cardClass = 'bg-white border border-[#E5E9EB] rounded-2xl p-6 shadow-[0_4px_20px_rgba(47,72,88,0.03)] flex flex-col gap-4';
const titleClass = 'text-[1rem] font-bold text-[#2F4858] tracking-tight font-brand';
const secondaryBtn =
  'px-4 py-2 rounded-xl text-[0.82rem] font-bold bg-white text-[#2F4858] border border-solid border-slate-200 hover:bg-slate-50 cursor-pointer transition-all';
const primaryBtn =
  'px-4 py-2 rounded-xl text-[0.82rem] font-bold bg-[#2F4858] hover:bg-[#3E6976] text-white border-none cursor-pointer transition-all';

function formatRole(role: string): string {
  const map: Record<string, string> = {
    admin: 'Administrateur',
    user: 'Utilisateur',
    student: 'Étudiant',
    researcher: 'Chercheur',
    teacher: 'Enseignant',
  };
  return map[role.toLowerCase()] || role;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center gap-4 py-2.5 border-b border-slate-100 last:border-b-0">
      <span className="text-[0.78rem] text-slate-500 font-semibold">{label}</span>
      <span className="text-[0.85rem] text-[#2F4858] font-bold truncate">{value}</span>
    </div>
  );
}

/** Marketing consent given in the onboarding questionnaire; can be withdrawn at any time. */
function MarketingConsentCard() {
  // undefined = loading; null = questionnaire not submitted or route unavailable (card hidden)
  const [optIn, setOptIn] = useState<boolean | null | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getOnboarding()
      .then((o) => !cancelled && setOptIn(o.completed ? o.marketing_opt_in : null))
      .catch(() => !cancelled && setOptIn(null));
    return () => {
      cancelled = true;
    };
  }, []);

  if (optIn == null) return null;

  const toggle = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const res = await updateMarketingConsent(!optIn);
      setOptIn(res.marketing_opt_in);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Votre choix n'a pas pu être enregistré.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className={cardClass}>
      <h3 className={titleClass}>Communications</h3>
      <label className={`flex items-start gap-3 ${isSaving ? 'opacity-60' : 'cursor-pointer'}`}>
        <input
          type="checkbox"
          checked={optIn}
          disabled={isSaving}
          onChange={() => void toggle()}
          className="mt-0.5 w-4 h-4 accent-[#518B91] cursor-pointer flex-shrink-0"
        />
        <span className="text-[0.82rem] text-slate-600 leading-relaxed">
          J'accepte que MemoFlow me contacte par email (conseils de méthodologie, offres adaptées à mon échéance).
        </span>
      </label>
      {error && <p className="text-[0.78rem] text-red-500 m-0">{error}</p>}
    </section>
  );
}

/** Google Analytics consent (asked by the banner), can be changed at any time */
function AnalyticsConsentCard() {
  const consent = useAnalyticsConsent();
  return (
    <section className={cardClass}>
      <h3 className={titleClass}>Mesure d'audience</h3>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={consent === 'granted'}
          onChange={(e) => setAnalyticsConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[#518B91] cursor-pointer flex-shrink-0"
        />
        <span className="text-[0.82rem] text-slate-600 leading-relaxed">
          J'accepte les cookies Google Analytics, qui servent uniquement à mesurer l'audience et l'utilisation de
          MemoFlow. Si vous les refusez après les avoir acceptés, la page se recharge.
        </span>
      </label>
    </section>
  );
}

export default function SettingsPage({
  user,
  onLogout,
  onRequestLogin,
  onRequestSignup,
  onOpenPrivacy,
  onOpenTerms,
}: SettingsPageProps) {
  const displayName = user?.display_name || GUEST_DISPLAY_NAME;

  return (
    <div className="max-w-[760px] mx-auto flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[1.8rem] font-bold text-[#2F4858] tracking-tight font-brand">Paramètres</h2>
        <p className="text-[0.88rem] text-slate-500 font-medium">Votre compte, votre session et vos données.</p>
      </div>

      {/* Profile */}
      <section className={cardClass}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#94D2B8]/30 border border-[#94D2B8]/40 flex items-center justify-center text-[#2F4858] font-bold text-lg">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <h3 className={titleClass}>{displayName}</h3>
            <span className="text-[0.78rem] text-slate-500 font-medium">
              {user ? user.email : 'Mode invité — non connecté'}
            </span>
          </div>
        </div>

        {user && (
          <div className="flex flex-col">
            <InfoRow label="Nom d'affichage" value={user.display_name} />
            <InfoRow label="Adresse email" value={user.email} />
            <InfoRow label="Rôle" value={formatRole(user.role)} />
            <InfoRow label="Niveau" value={`${user.level} (${user.xp.toLocaleString('fr-FR')} XP)`} />
            {user.last_active_at && (
              <InfoRow label="Dernière activité" value={new Date(user.last_active_at).toLocaleString('fr-FR')} />
            )}
          </div>
        )}
      </section>

      {/* Session */}
      <section className={cardClass}>
        <h3 className={titleClass}>Session</h3>
        {user ? (
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <p className="text-[0.82rem] text-slate-500 m-0">Vos documents sont enregistrés sur votre compte.</p>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl text-[0.82rem] font-bold bg-white text-red-500 border border-solid border-red-200 hover:bg-red-50 cursor-pointer transition-all"
            >
              Se déconnecter
            </button>
          </div>
        ) : (
          <>
            <p className="text-[0.82rem] text-slate-500 leading-relaxed m-0">
              Vous utilisez MemoFlow en mode invité. Vos documents restent uniquement dans cet onglet et sont perdus
              à la fermeture ou au rechargement de la page. Créez un compte pour les sauvegarder et accéder aux modèles,
              à l'assistant IA, aux connecteurs et à la progression.
            </p>
            <div className="flex gap-2.5 flex-wrap">
              <button onClick={onRequestLogin} className={secondaryBtn}>Se connecter</button>
              <button onClick={onRequestSignup} className={primaryBtn}>Créer un compte</button>
            </div>
          </>
        )}
      </section>

      {user?.role === 'admin' && (
        <section className={cardClass}>
          <h3 className={titleClass}>Administration</h3>
          <p className="text-[0.82rem] text-slate-500 leading-relaxed m-0">
            Suivi des leads : statistiques, scores et réponses au questionnaire.
          </p>
          <div>
            <Link to={ROUTES.admin} className={`${primaryBtn} inline-block no-underline`}>
              Ouvrir l'espace administrateur
            </Link>
          </div>
        </section>
      )}

      {user && user.role !== 'admin' && <MarketingConsentCard />}

      {ANALYTICS_ENABLED && <AnalyticsConsentCard />}

      {/* Privacy & data */}
      {(onOpenPrivacy || onOpenTerms) && (
        <section className={cardClass}>
          <h3 className={titleClass}>Confidentialité & données</h3>
          <p className="text-[0.82rem] text-slate-500 leading-relaxed m-0">
            Consultez l'inventaire des données traitées par MemoFlow, les services tiers utilisés et vos droits RGPD.
          </p>
          <div className="flex gap-2.5 flex-wrap">
            {onOpenPrivacy && (
              <button onClick={onOpenPrivacy} className={secondaryBtn}>Inventaire des données</button>
            )}
            {onOpenTerms && (
              <button onClick={onOpenTerms} className={secondaryBtn}>Conditions d'utilisation</button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
