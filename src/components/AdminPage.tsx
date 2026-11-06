import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRotateRight,
  faChevronLeft,
  faChevronRight,
  faFileExcel,
  faRightFromBracket,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ApiError } from '../services/api';
import type { UserResponseDto } from '../services/api';
import {
  fetchLead,
  fetchLeads,
  fetchLeadStats,
  ACTION_LABELS,
  BLOCKER_LABELS,
  CHANNEL_LABELS,
  CONNECTOR_LABELS,
  DELIVERABLE_LABELS,
  LEVEL_LABELS,
  PERSONA_LABELS,
  RULE_LABELS,
  SIGNAL_LABELS,
  TIER_LABELS,
  WORK_TOOL_LABELS,
} from '../services/admin';
import type { LeadDetail, LeadFilters, LeadTier, SuggestedAction } from '../services/admin';
import { exportLeadsToExcel } from '../services/leadExport';
import BrandLogo from './BrandLogo';
import Link from './Link';
import { ROUTES } from '../services/router';

// ─── Shared styles ───────────────────────────────────────────────────────────
const cardClass = 'bg-white border border-[#E5E9EB] rounded-2xl p-5 shadow-[0_4px_20px_rgba(47,72,88,0.03)]';
const cardTitle = 'font-brand text-[0.95rem] font-bold text-[#2F4858] tracking-tight m-0';
const mutedText = 'text-[0.78rem] text-slate-500';
const ghostBtn =
  'px-3.5 py-2 rounded-xl text-[0.8rem] font-bold bg-white text-[#2F4858] border border-solid border-[#E5E9EB] hover:bg-slate-50 cursor-pointer transition-colors flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed';
const selectClass =
  'px-3 py-2 rounded-xl border border-solid border-[#E5E9EB] bg-white text-[0.8rem] text-[#2F4858] font-semibold focus:outline-none focus:border-[#518B91] cursor-pointer';

const PAGE_SIZE = 25;

// ─── Formatting ──────────────────────────────────────────────────────────────
const fmtNumber = (n: number) => n.toLocaleString('fr-FR');
const fmtPercent = (part: number, whole: number) => (whole > 0 ? `${Math.round((part / whole) * 100)} %` : '—');

function fmtDateTime(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** YYYY-MM-DD, read as a local calendar day */
function parseDay(ymd: string): Date {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function fmtDay(ymd: string | null): string {
  if (!ymd) return '—';
  return parseDay(ymd).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

function isPastDay(ymd: string | null): boolean {
  if (!ymd) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return parseDay(ymd) < today;
}

function describeError(err: unknown, notFound: string): string {
  if (err instanceof ApiError) {
    if (err.statusCode === 404) return notFound;
    if (err.statusCode === 403) return 'Accès réservé aux administrateurs.';
    return err.message;
  }
  return 'Une erreur inattendue est survenue.';
}

const ROUTES_MISSING =
  "Les routes d'administration (/leads) ne répondent pas encore : elles ne sont pas déployées sur le backend.";

// ─── Data loading (state is only set from promise callbacks) ─────────────────
function useResource<T>(load: ((signal: AbortSignal) => Promise<T>) | null) {
  const [state, setState] = useState<{ load: unknown; data?: T; error?: unknown }>({ load: null });

  useEffect(() => {
    if (!load) return;
    const controller = new AbortController();
    load(controller.signal).then(
      (data) => setState({ load, data }),
      (error) => {
        if (!controller.signal.aborted) setState({ load, error });
      }
    );
    return () => controller.abort();
  }, [load]);

  const isCurrent = state.load === load;
  return {
    data: isCurrent ? state.data : undefined,
    error: isCurrent ? state.error : undefined,
    loading: !!load && !isCurrent,
    /** last data received, kept while the next request loads */
    lastData: state.data,
  };
}

// ─── Small components ────────────────────────────────────────────────────────
const TIER_BADGE: Record<LeadTier, string> = {
  hot: 'bg-[#2F4858] text-white',
  warm: 'bg-[#94D2B8]/45 text-[#2F4858]',
  cold: 'bg-slate-100 text-slate-500',
};

function TierBadge({ tier }: { tier: LeadTier }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[0.72rem] font-bold whitespace-nowrap ${TIER_BADGE[tier]}`}>
      {TIER_LABELS[tier]}
    </span>
  );
}

function StatTile({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className={`${cardClass} flex flex-col gap-1`}>
      <span className="text-[0.75rem] font-semibold text-slate-500">{label}</span>
      <span className="font-brand text-[1.9rem] font-bold text-[#2F4858] leading-tight tabular-nums">{value}</span>
      {detail && <span className={mutedText}>{detail}</span>}
    </div>
  );
}

interface BarItem {
  key: string;
  label: string;
  value: number;
}

/** Horizontal bars on one baseline, one hue; every value is also written as text. */
function BarList({ items, denominator, ranked = true }: { items: BarItem[]; denominator: number; ranked?: boolean }) {
  const rows = ranked ? [...items].sort((a, b) => b.value - a.value) : items;
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="list-none m-0 p-0 flex flex-col gap-1">
      {rows.map((row) => (
        <li
          key={row.key}
          title={`${row.label} : ${fmtNumber(row.value)} (${fmtPercent(row.value, denominator)})`}
          className="grid grid-cols-[minmax(0,9.5rem)_1fr_auto] items-center gap-3 px-1.5 py-1 rounded-lg hover:bg-[#F1F5F7]"
        >
          <span className="text-[0.8rem] text-slate-600 truncate">{row.label}</span>
          <span className="h-2 bg-[#EEF2F4] rounded-r-[4px] overflow-hidden">
            {row.value > 0 && (
              <span className="block h-full bg-[#518B91] rounded-r-[4px]" style={{ width: `${(row.value / max) * 100}%` }} />
            )}
          </span>
          <span className="text-[0.78rem] text-[#2F4858] font-semibold tabular-nums whitespace-nowrap">
            {fmtNumber(row.value)} <span className="text-slate-400 font-medium">· {fmtPercent(row.value, denominator)}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

function toBarItems<K extends string>(counts: Record<K, number>, labels: Record<K, string>): BarItem[] {
  return (Object.keys(labels) as K[]).map((key) => ({ key, label: labels[key], value: counts[key] ?? 0 }));
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div className="px-4 py-3 rounded-xl bg-red-50 border border-solid border-red-100 text-[0.82rem] text-red-600">
      {message}
    </div>
  );
}

// ─── Stats ───────────────────────────────────────────────────────────────────
function StatsSection() {
  const { data: stats, error, loading } = useResource(fetchLeadStats);

  if (loading) return <p className={mutedText}>Chargement des statistiques…</p>;
  if (error || !stats) return <ErrorBox message={describeError(error, ROUTES_MISSING)} />;

  const total = stats.total_leads;
  const completed = stats.onboarding.completed;
  const d = stats.distributions;

  const distributionCards: { title: string; items: BarItem[]; multi?: boolean }[] = [
    { title: 'Statut', items: toBarItems(d.persona, PERSONA_LABELS) },
    { title: 'Document à rendre', items: toBarItems(d.deliverable_type, DELIVERABLE_LABELS) },
    { title: 'Niveau', items: toBarItems(d.academic_level, LEVEL_LABELS) },
    { title: 'Traces du travail', items: toBarItems(d.work_tools, WORK_TOOL_LABELS), multi: true },
    { title: 'Difficultés', items: toBarItems(d.blockers, BLOCKER_LABELS), multi: true },
    { title: 'Canal d’acquisition', items: toBarItems(d.acquisition_channel, CHANNEL_LABELS) },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-5 gap-4 max-xl:grid-cols-3 max-sm:grid-cols-2">
        <StatTile label="Leads" value={fmtNumber(total)} detail="hors admins et comptes désactivés" />
        <StatTile label="Questionnaire rempli" value={fmtNumber(completed)} detail={`${fmtPercent(completed, total)} des leads`} />
        <StatTile
          label="Accord pour les emails"
          value={fmtNumber(stats.marketing_opt_in)}
          detail={`${fmtPercent(stats.marketing_opt_in, total)} des leads`}
        />
        <StatTile
          label="Application connectée"
          value={fmtNumber(stats.connected_tool)}
          detail={`${fmtPercent(stats.connected_tool, total)} des leads`}
        />
        <StatTile
          label={SIGNAL_LABELS.export_paywall_hit}
          value={fmtNumber(stats.signals.export_paywall_hit)}
          detail={`${fmtPercent(stats.signals.export_paywall_hit, total)} des leads`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        <section className={`${cardClass} flex flex-col gap-3`}>
          <h3 className={cardTitle}>Catégories</h3>
          <BarList
            ranked={false}
            denominator={total}
            items={(['hot', 'warm', 'cold'] as LeadTier[]).map((t) => ({ key: t, label: TIER_LABELS[t], value: stats.tiers[t] }))}
          />
          <p className={`${mutedText} m-0`}>Chaud : 8 points et plus · Tiède : 4 à 7 · Froid : moins de 4.</p>
        </section>
        <section className={`${cardClass} flex flex-col gap-3`}>
          <h3 className={cardTitle}>Actions suggérées</h3>
          <BarList
            ranked={false}
            denominator={total}
            items={(Object.keys(ACTION_LABELS) as SuggestedAction[]).map((a) => ({
              key: a,
              label: ACTION_LABELS[a],
              value: stats.suggested_actions[a],
            }))}
          />
          <p className={`${mutedText} m-0`}>Sans accord pour les emails, l’action est toujours « Aucun contact ».</p>
        </section>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className={cardTitle}>Réponses au questionnaire</h3>
        <p className={`${mutedText} m-0`}>
          Sur {fmtNumber(completed)} questionnaire{completed > 1 ? 's' : ''} rempli{completed > 1 ? 's' : ''}. Pour les
          questions à choix multiples, le total peut dépasser 100 %.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-2 max-md:grid-cols-1">
        {distributionCards.map((card) => (
          <section key={card.title} className={`${cardClass} flex flex-col gap-3`}>
            <h4 className="font-brand text-[0.85rem] font-bold text-[#2F4858] m-0">
              {card.title}
              {card.multi && <span className="font-sans font-medium text-slate-400"> · choix multiples</span>}
            </h4>
            <BarList items={card.items} denominator={completed} />
          </section>
        ))}
      </div>

      <p className={`${mutedText} m-0`}>Statistiques générées le {new Date(stats.generated_at).toLocaleString('fr-FR')}.</p>
    </div>
  );
}

// ─── Leads table ─────────────────────────────────────────────────────────────
type BoolFilter = '' | 'true' | 'false';
const toBool = (v: BoolFilter) => (v === '' ? undefined : v === 'true');

function LeadsSection({ onSelect }: { onSelect: (userId: string) => void }) {
  const [tier, setTier] = useState<'' | LeadTier>('');
  const [onboarding, setOnboarding] = useState<BoolFilter>('');
  const [optIn, setOptIn] = useState<BoolFilter>('');
  const [page, setPage] = useState(1);

  const filters: LeadFilters = useMemo(
    () => ({
      tier: tier || undefined,
      onboarding_completed: toBool(onboarding),
      marketing_opt_in: toBool(optIn),
      page,
      limit: PAGE_SIZE,
    }),
    [tier, onboarding, optIn, page]
  );
  const loadLeads = useCallback((signal: AbortSignal) => fetchLeads(filters, signal), [filters]);
  const { data, error, loading, lastData } = useResource(loadLeads);
  const shown = data ?? (loading ? lastData : undefined);

  // Excel export (same filters as the table, all pages)
  const [exportProgress, setExportProgress] = useState<{ done: number; total: number } | null>(null);
  const [exportMessage, setExportMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const exportAbortRef = useRef<AbortController | null>(null);
  useEffect(() => () => exportAbortRef.current?.abort(), []);

  const handleExport = async () => {
    const controller = new AbortController();
    exportAbortRef.current = controller;
    setExportMessage(null);
    setExportProgress({ done: 0, total: 0 });
    try {
      const count = await exportLeadsToExcel(
        { tier: filters.tier, onboarding_completed: filters.onboarding_completed, marketing_opt_in: filters.marketing_opt_in },
        (done, total) => setExportProgress({ done, total }),
        controller.signal
      );
      setExportMessage({ kind: 'ok', text: `${fmtNumber(count)} lead${count > 1 ? 's' : ''} exporté${count > 1 ? 's' : ''}.` });
    } catch (err) {
      if (controller.signal.aborted) return;
      console.error('Lead export failed:', err);
      setExportMessage({ kind: 'error', text: `Export impossible : ${describeError(err, ROUTES_MISSING)}` });
    } finally {
      if (!controller.signal.aborted) setExportProgress(null);
    }
  };

  const totalPages = shown ? Math.max(1, Math.ceil(shown.total / shown.limit)) : 1;
  const from = shown && shown.items.length > 0 ? (shown.page - 1) * shown.limit + 1 : 0;
  const to = shown ? from + shown.items.length - (shown.items.length > 0 ? 1 : 0) : 0;

  return (
    <section className={`${cardClass} flex flex-col gap-4 p-0 overflow-hidden`}>
      <div className="flex items-center justify-between gap-3 flex-wrap px-5 pt-5">
        <h3 className={cardTitle}>Leads</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            aria-label="Catégorie"
            className={selectClass}
            value={tier}
            onChange={(e) => {
              setTier(e.target.value as '' | LeadTier);
              setPage(1);
            }}
          >
            <option value="">Toutes les catégories</option>
            <option value="hot">Chaud</option>
            <option value="warm">Tiède</option>
            <option value="cold">Froid</option>
          </select>
          <select
            aria-label="Questionnaire"
            className={selectClass}
            value={onboarding}
            onChange={(e) => {
              setOnboarding(e.target.value as BoolFilter);
              setPage(1);
            }}
          >
            <option value="">Questionnaire : tous</option>
            <option value="true">Questionnaire rempli</option>
            <option value="false">Questionnaire non rempli</option>
          </select>
          <select
            aria-label="Accord pour les emails"
            className={selectClass}
            value={optIn}
            onChange={(e) => {
              setOptIn(e.target.value as BoolFilter);
              setPage(1);
            }}
          >
            <option value="">Emails : tous</option>
            <option value="true">Accepte les emails</option>
            <option value="false">Refuse les emails</option>
          </select>
          <button
            type="button"
            className="px-4 py-2 rounded-xl text-[0.8rem] font-bold bg-[#217346] hover:bg-[#1A5C38] text-white border-none shadow-sm cursor-pointer transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-wait"
            onClick={() => void handleExport()}
            disabled={exportProgress !== null}
            title="Exporte les leads correspondant aux filtres : inscription, questionnaire et score"
          >
            <FontAwesomeIcon icon={faFileExcel} />
            {exportProgress
              ? exportProgress.total > 0
                ? `Export… ${exportProgress.done} / ${exportProgress.total}`
                : 'Export…'
              : 'Exporter en Excel'}
          </button>
        </div>
      </div>
      {exportMessage && (
        <p
          role="status"
          className={`px-5 m-0 text-[0.8rem] ${exportMessage.kind === 'error' ? 'text-red-600' : 'text-[#3E6976]'}`}
        >
          {exportMessage.text}
        </p>
      )}

      {error ? (
        <div className="px-5 pb-5">
          <ErrorBox message={describeError(error, ROUTES_MISSING)} />
        </div>
      ) : !shown ? (
        <p className={`${mutedText} px-5 pb-5 m-0`}>Chargement des leads…</p>
      ) : (
        <>
          <div className={`overflow-x-auto custom-scrollbar transition-opacity ${loading ? 'opacity-50' : ''}`}>
            <table className="w-full border-collapse text-left text-[0.8rem]">
              <thead>
                <tr className="bg-[#F8FAFB] text-slate-500 text-[0.72rem] uppercase tracking-wide">
                  <th className="px-5 py-2.5 font-semibold">Utilisateur</th>
                  <th className="px-3 py-2.5 font-semibold text-right">Score</th>
                  <th className="px-3 py-2.5 font-semibold">Catégorie</th>
                  <th className="px-3 py-2.5 font-semibold">Action suggérée</th>
                  <th className="px-3 py-2.5 font-semibold">Statut</th>
                  <th className="px-3 py-2.5 font-semibold">Rendu</th>
                  <th className="px-3 py-2.5 font-semibold">Emails</th>
                  <th className="px-3 py-2.5 font-semibold">Inscription</th>
                  <th className="px-5 py-2.5 font-semibold">Dernière activité</th>
                </tr>
              </thead>
              <tbody>
                {shown.items.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-5 py-8 text-center text-slate-500">
                      Aucun lead ne correspond à ces filtres.
                    </td>
                  </tr>
                )}
                {shown.items.map((lead) => (
                  <tr
                    key={lead.user_id}
                    onClick={() => onSelect(lead.user_id)}
                    className="border-t border-[#EEF2F4] hover:bg-[#F8FAFB] cursor-pointer"
                  >
                    <td className="px-5 py-3 max-w-[260px]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(lead.user_id);
                        }}
                        className="bg-transparent border-none p-0 text-left cursor-pointer w-full"
                      >
                        <span className="block font-bold text-[#2F4858] truncate">{lead.display_name}</span>
                        <span className="block text-slate-500 truncate">{lead.email}</span>
                      </button>
                    </td>
                    <td className="px-3 py-3 text-right font-bold text-[#2F4858] tabular-nums">{lead.score}</td>
                    <td className="px-3 py-3">
                      <TierBadge tier={lead.tier} />
                    </td>
                    <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{ACTION_LABELS[lead.suggested_action]}</td>
                    <td className="px-3 py-3 text-slate-600 whitespace-nowrap">
                      {lead.persona ? PERSONA_LABELS[lead.persona] : '—'}
                    </td>
                    <td className={`px-3 py-3 whitespace-nowrap ${isPastDay(lead.due_date) ? 'text-slate-400' : 'text-slate-600'}`}>
                      {fmtDay(lead.due_date)}
                      {isPastDay(lead.due_date) && ' (passée)'}
                    </td>
                    <td className="px-3 py-3 text-slate-600">{lead.marketing_opt_in ? 'Oui' : 'Non'}</td>
                    <td className="px-3 py-3 text-slate-600 whitespace-nowrap">{fmtDateTime(lead.registered_at)}</td>
                    <td className="px-5 py-3 text-slate-600 whitespace-nowrap">{fmtDateTime(lead.last_active_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between gap-3 px-5 pb-5 flex-wrap">
            <span className={mutedText}>
              {shown.total === 0 ? '0 lead' : `${fmtNumber(from)}–${fmtNumber(to)} sur ${fmtNumber(shown.total)}`}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={ghostBtn}
                disabled={loading || shown.page <= 1}
                onClick={() => setPage(Math.max(1, shown.page - 1))}
              >
                <FontAwesomeIcon icon={faChevronLeft} /> Précédent
              </button>
              <span className="text-[0.78rem] text-slate-500 tabular-nums">
                Page {shown.page} / {totalPages}
              </span>
              <button
                type="button"
                className={ghostBtn}
                disabled={loading || shown.page >= totalPages}
                onClick={() => setPage(shown.page + 1)}
              >
                Suivant <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

// ─── Lead detail drawer ──────────────────────────────────────────────────────
function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[9rem_1fr] gap-3 py-2 border-b border-[#EEF2F4] last:border-b-0">
      <dt className="text-[0.78rem] text-slate-500 font-semibold">{label}</dt>
      <dd className="text-[0.82rem] text-[#2F4858] m-0">{children}</dd>
    </div>
  );
}

function DetailBody({ lead }: { lead: LeadDetail }) {
  const o = lead.onboarding;
  const list = <K extends string>(values: K[] | null, labels: Record<K, string>) =>
    values && values.length > 0 ? values.map((v) => labels[v]).join(', ') : 'Aucun';

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-brand text-[1.3rem] font-bold text-[#2F4858] m-0 break-words">{lead.display_name}</h2>
        <p className="text-[0.85rem] text-slate-500 m-0 mt-0.5 break-all">{lead.email}</p>
        <p className={`${mutedText} m-0 mt-2`}>
          Inscrit le {fmtDateTime(lead.registered_at)} · dernière activité {fmtDateTime(lead.last_active_at)}
        </p>
      </div>

      <section className="flex items-end gap-4 flex-wrap">
        <div className="flex items-baseline gap-1.5">
          <span className="font-brand text-[3rem] font-bold text-[#2F4858] leading-none tabular-nums">{lead.score}</span>
          <span className="text-[0.85rem] text-slate-500">point{lead.score > 1 ? 's' : ''}</span>
        </div>
        <div className="flex flex-col gap-1.5 pb-1">
          <TierBadge tier={lead.tier} />
          <span className="text-[0.8rem] text-[#2F4858] font-semibold">{ACTION_LABELS[lead.suggested_action]}</span>
        </div>
      </section>
      <p className={`${mutedText} m-0 -mt-4`}>
        {lead.score_computed_at
          ? `Score calculé le ${new Date(lead.score_computed_at).toLocaleString('fr-FR')}.`
          : 'Score pas encore calculé.'}
      </p>

      <section className="flex flex-col gap-2">
        <h3 className={cardTitle}>Détail du score</h3>
        {lead.breakdown.length === 0 ? (
          <p className={`${mutedText} m-0`}>Aucun critère rempli.</p>
        ) : (
          <ul className="list-none m-0 p-0 flex flex-col">
            {lead.breakdown.map((b) => (
              <li key={b.rule} className="flex justify-between gap-3 py-2 border-b border-[#EEF2F4] last:border-b-0 text-[0.82rem]">
                <span className="text-slate-600">{RULE_LABELS[b.rule] ?? b.rule}</span>
                <span className="font-bold text-[#2F4858] tabular-nums">+{b.points}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <h3 className={cardTitle}>Questionnaire</h3>
        {!o.completed ? (
          <p className={`${mutedText} m-0`}>Pas encore rempli.</p>
        ) : (
          <dl className="m-0">
            <DetailRow label="Statut">{o.persona ? PERSONA_LABELS[o.persona] : '—'}</DetailRow>
            <DetailRow label="À rendre">{o.deliverable_type ? DELIVERABLE_LABELS[o.deliverable_type] : '—'}</DetailRow>
            <DetailRow label="Date de rendu">
              {fmtDay(o.due_date)}
              {isPastDay(o.due_date) && <span className="text-slate-400"> (passée)</span>}
            </DetailRow>
            <DetailRow label="Niveau">{o.academic_level ? LEVEL_LABELS[o.academic_level] : '—'}</DetailRow>
            <DetailRow label="École">{o.school_name || 'Non renseignée'}</DetailRow>
            <DetailRow label="Traces du travail">{list(o.work_tools, WORK_TOOL_LABELS)}</DetailRow>
            <DetailRow label="Difficultés">{list(o.blockers, BLOCKER_LABELS)}</DetailRow>
            <DetailRow label="Canal">{o.acquisition_channel ? CHANNEL_LABELS[o.acquisition_channel] : '—'}</DetailRow>
            <DetailRow label="Emails">
              {o.marketing_opt_in ? 'Accepte' : 'Refuse'}
              {o.marketing_opt_in_at && <span className="text-slate-400"> depuis le {fmtDateTime(o.marketing_opt_in_at)}</span>}
            </DetailRow>
            <DetailRow label="Envoyé le">{fmtDateTime(o.submitted_at)}</DetailRow>
          </dl>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <h3 className={cardTitle}>Applications connectées</h3>
        <p className="text-[0.82rem] text-[#2F4858] m-0">
          {lead.active_connectors.length > 0
            ? lead.active_connectors.map((c) => CONNECTOR_LABELS[c] ?? c).join(', ')
            : 'Aucune'}
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className={cardTitle}>Signaux</h3>
        {lead.signals.length === 0 ? (
          <p className={`${mutedText} m-0`}>Aucun.</p>
        ) : (
          <ul className="list-none m-0 p-0 flex flex-col gap-2">
            {lead.signals.map((s) => (
              <li key={s.type} className="text-[0.82rem]">
                <span className="font-semibold text-[#2F4858]">{SIGNAL_LABELS[s.type] ?? s.type}</span>
                <span className="text-slate-500">
                  {' '}
                  · {s.occurrences} fois, du {fmtDateTime(s.first_seen_at)} au {fmtDateTime(s.last_seen_at)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function LeadDrawer({ userId, onClose }: { userId: string; onClose: () => void }) {
  const loadLead = useCallback((signal: AbortSignal) => fetchLead(userId, signal), [userId]);
  const { data: lead, error, loading } = useResource(loadLead);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-[#2F4858]/25" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Fiche du lead"
        className="relative w-[460px] max-w-full h-full bg-white shadow-2xl flex flex-col animate-fade-in"
      >
        <div className="h-14 px-5 flex items-center justify-between border-b border-[#E5E9EB] flex-shrink-0">
          <span className="font-brand text-[0.9rem] font-bold text-[#2F4858]">Fiche du lead</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-lg bg-transparent border-none text-slate-500 hover:bg-slate-100 hover:text-[#2F4858] cursor-pointer"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
          {loading && <p className={mutedText}>Chargement…</p>}
          {error != null && (
            <ErrorBox message={describeError(error, 'Lead introuvable : utilisateur inconnu, administrateur ou désactivé.')} />
          )}
          {lead && <DetailBody lead={lead} />}
        </div>
      </aside>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
function AdminContent() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const closeDrawer = useCallback(() => setSelectedId(null), []);

  return (
    <>
      <StatsSection />
      <LeadsSection onSelect={setSelectedId} />
      {selectedId && <LeadDrawer userId={selectedId} onClose={closeDrawer} />}
    </>
  );
}

interface AdminShellProps {
  user: UserResponseDto | null;
  onBackToApp: () => void;
  onLogout?: () => void;
  actions?: ReactNode;
  children: ReactNode;
}

function AdminShell({ user, onBackToApp, onLogout, actions, children }: AdminShellProps) {
  return (
    <div className="min-h-screen w-full bg-[#F8FAFB] flex flex-col">
      <header className="h-16 px-8 max-sm:px-4 flex items-center justify-between gap-4 border-b border-[#E5E9EB] bg-white sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link to={ROUTES.home} className="flex items-center gap-3 no-underline" aria-label="MemoFlow, accueil">
            <BrandLogo size={34} />
            <span className="font-brand text-[1.2rem] font-bold text-[#2F4858] tracking-tight">MemoFlow</span>
          </Link>
          <span className="px-2 py-0.5 rounded-md bg-[#EAF3DE] text-[#3E6976] text-[0.7rem] font-bold uppercase tracking-wider">
            Administration
          </span>
        </div>
        <div className="flex items-center gap-2">
          {actions}
          <button type="button" className={ghostBtn} onClick={onBackToApp}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="max-sm:hidden">Retour à l'application</span>
          </button>
          {user && onLogout && (
            <button type="button" className={ghostBtn} onClick={onLogout} title={`Déconnecter ${user.email}`}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span className="max-sm:hidden">Se déconnecter</span>
            </button>
          )}
        </div>
      </header>
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-8 max-sm:px-4 py-8 flex flex-col gap-6">{children}</main>
    </div>
  );
}

interface AdminPageProps {
  /** null for guests */
  user: UserResponseDto | null;
  onRequestLogin: () => void;
  onBackToApp: () => void;
  onLogout: () => void;
}

export default function AdminPage({ user, onRequestLogin, onBackToApp, onLogout }: AdminPageProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  if (!user || user.role !== 'admin') {
    return (
      <AdminShell user={user} onBackToApp={onBackToApp} onLogout={onLogout}>
        <section className={`${cardClass} max-w-[520px] mx-auto mt-10 p-7 flex flex-col gap-4`}>
          <h1 className="font-brand text-[1.4rem] font-bold text-[#2F4858] m-0">Espace administrateur</h1>
          {user ? (
            <p className="text-[0.88rem] text-slate-600 leading-relaxed m-0">
              Le compte <strong>{user.email}</strong> n'a pas le rôle administrateur. Connecte-toi avec un compte
              administrateur pour accéder à cette page.
            </p>
          ) : (
            <p className="text-[0.88rem] text-slate-600 leading-relaxed m-0">
              Connecte-toi avec un compte administrateur pour accéder au suivi des leads.
            </p>
          )}
          <div className="flex gap-2.5 flex-wrap">
            {user ? (
              <button type="button" className={ghostBtn} onClick={onLogout}>
                Changer de compte
              </button>
            ) : (
              <button
                type="button"
                onClick={onRequestLogin}
                className="px-4 py-2 rounded-xl text-[0.82rem] font-bold bg-[#2F4858] hover:bg-[#3E6976] text-white border-none cursor-pointer transition-colors"
              >
                Se connecter
              </button>
            )}
          </div>
        </section>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      user={user}
      onBackToApp={onBackToApp}
      onLogout={onLogout}
      actions={
        <button type="button" className={ghostBtn} onClick={() => setRefreshKey((k) => k + 1)}>
          <FontAwesomeIcon icon={faArrowRotateRight} />
          <span className="max-sm:hidden">Actualiser</span>
        </button>
      }
    >
      <div className="flex flex-col gap-1">
        <h1 className="font-brand text-[1.8rem] font-bold text-[#2F4858] tracking-tight m-0">Suivi des leads</h1>
        <p className="text-[0.88rem] text-slate-500 m-0">
          Score calculé par le backend à partir du questionnaire et de l'activité. Visible uniquement par les
          administrateurs ; aucun email n'est envoyé automatiquement.
        </p>
      </div>
      <AdminContent key={refreshKey} />
    </AdminShell>
  );
}
