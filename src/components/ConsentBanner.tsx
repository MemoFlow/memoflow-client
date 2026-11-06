import { ANALYTICS_ENABLED, setAnalyticsConsent, useAnalyticsConsent } from '../services/analytics';

/**
 * Asked once, before any Google Analytics cookie. "Refuser" is as visible and as easy
 * as "Accepter" (CNIL). The choice can be changed later in Paramètres.
 */
export default function ConsentBanner({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const consent = useAnalyticsConsent();
  if (!ANALYTICS_ENABLED || consent !== null) return null;

  const btn =
    'px-5 py-2.5 rounded-xl text-[0.82rem] font-bold cursor-pointer transition-colors border border-solid min-w-[120px]';

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Mesure d'audience"
      className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-[760px] bg-white border border-[#E5E9EB] rounded-2xl shadow-[0_12px_40px_rgba(47,72,88,0.18)] p-5 flex items-center gap-5 max-md:flex-col max-md:items-stretch animate-fade-in"
    >
      <div className="flex-1 flex flex-col gap-1">
        <p className="font-brand text-[0.95rem] font-bold text-[#2F4858] m-0">Mesure d'audience</p>
        <p className="text-[0.8rem] text-slate-600 leading-relaxed m-0">
          Avec votre accord, nous utilisons Google Analytics pour savoir quelles pages sont consultées et améliorer
          MemoFlow. Aucun cookie de mesure n'est déposé si vous refusez. Vous pouvez changer d'avis à tout moment dans
          Paramètres.{' '}
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="bg-transparent border-none p-0 text-[#3E6976] underline cursor-pointer text-[0.8rem] font-semibold"
          >
            En savoir plus
          </button>
        </p>
      </div>
      <div className="flex gap-2.5 flex-shrink-0 max-md:w-full">
        <button
          type="button"
          onClick={() => setAnalyticsConsent(false)}
          className={`${btn} bg-white text-[#2F4858] border-[#2F4858] hover:bg-slate-50 max-md:flex-1`}
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => setAnalyticsConsent(true)}
          className={`${btn} bg-[#2F4858] text-white border-[#2F4858] hover:bg-[#3E6976] max-md:flex-1`}
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
