import { ApiError } from './api';
import {
  fetchLead,
  fetchLeads,
  ACTION_LABELS,
  BLOCKER_LABELS,
  CHANNEL_LABELS,
  DELIVERABLE_LABELS,
  LEVEL_LABELS,
  PERSONA_LABELS,
  TIER_LABELS,
  WORK_TOOL_LABELS,
} from './admin';
import type { LeadFilters, LeadSummary } from './admin';
import type { OnboardingResponse } from './onboarding';

/**
 * Excel export of what users gave at signup (email, name) and in the onboarding
 * questionnaire. The API has no export route: the list is read page by page, then
 * each lead that completed the questionnaire is fetched for its full answers.
 */

const PAGE_LIMIT = 100; // API maximum
const DETAIL_CONCURRENCY = 6;

interface ExportRow {
  lead: LeadSummary;
  onboarding: OnboardingResponse | null;
}

export type ExportFilters = Omit<LeadFilters, 'page' | 'limit'>;
export type ExportProgress = (done: number, total: number) => void;

async function collectRows(filters: ExportFilters, onProgress?: ExportProgress, signal?: AbortSignal): Promise<ExportRow[]> {
  const byId = new Map<string, LeadSummary>();
  for (let page = 1; ; page += 1) {
    const res = await fetchLeads({ ...filters, page, limit: PAGE_LIMIT }, signal);
    res.items.forEach((lead) => byId.set(lead.user_id, lead));
    if (res.items.length === 0 || page * res.limit >= res.total) break;
  }

  const rows: ExportRow[] = [...byId.values()].map((lead) => ({ lead, onboarding: null }));
  const withAnswers = rows.filter((r) => r.lead.onboarding_completed);
  let done = 0;
  let cursor = 0;
  onProgress?.(0, withAnswers.length);

  const worker = async () => {
    while (cursor < withAnswers.length) {
      const row = withAnswers[cursor++];
      try {
        row.onboarding = (await fetchLead(row.lead.user_id, signal)).onboarding;
      } catch (err) {
        // Account disabled or promoted to admin during the export: keep the row without answers
        if (!(err instanceof ApiError && err.statusCode === 404)) throw err;
      }
      done += 1;
      onProgress?.(done, withAnswers.length);
    }
  };
  await Promise.all(Array.from({ length: Math.min(DETAIL_CONCURRENCY, withAnswers.length) }, worker));
  return rows;
}

// ─── Cell helpers ────────────────────────────────────────────────────────────
/** Calendar day as a UTC date, so Excel shows the same day whatever the time zone */
function dayCell(ymd: string | null): Date | null {
  if (!ymd) return null;
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/** Timestamp shown as the user's local calendar day */
function timestampCell(iso: string | null): Date | null {
  if (!iso) return null;
  const t = new Date(iso);
  return new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()));
}

const yesNo = (v: boolean) => (v ? 'Oui' : 'Non');
const label = <K extends string>(value: K | null | undefined, labels: Record<K, string>) => (value ? labels[value] : null);
const labelList = <K extends string>(values: K[] | null | undefined, labels: Record<K, string>) =>
  values ? (values.length > 0 ? values.map((v) => labels[v]).join(', ') : 'Aucun') : null;

const header = (value: string) => ({ value, fontWeight: 'bold' as const });

const COLUMNS: { title: string; width: number; cell: (r: ExportRow) => string | number | Date | null }[] = [
  // Signup form
  { title: 'Email', width: 32, cell: (r) => r.lead.email },
  { title: 'Prénom et nom', width: 24, cell: (r) => r.lead.display_name },
  { title: 'Inscription', width: 12, cell: (r) => timestampCell(r.lead.registered_at) },
  { title: 'Accord emails', width: 13, cell: (r) => yesNo(r.lead.marketing_opt_in) },
  { title: 'Accord modifié le', width: 16, cell: (r) => timestampCell(r.onboarding?.marketing_opt_in_at ?? null) },
  // Onboarding
  { title: 'Questionnaire rempli', width: 12, cell: (r) => yesNo(r.lead.onboarding_completed) },
  { title: 'Questionnaire envoyé le', width: 14, cell: (r) => timestampCell(r.onboarding?.submitted_at ?? null) },
  { title: 'Statut', width: 22, cell: (r) => label(r.onboarding?.persona ?? r.lead.persona, PERSONA_LABELS) },
  { title: 'Document à rendre', width: 20, cell: (r) => label(r.onboarding?.deliverable_type, DELIVERABLE_LABELS) },
  { title: 'Date de rendu', width: 13, cell: (r) => dayCell(r.onboarding?.due_date ?? r.lead.due_date) },
  { title: 'Niveau', width: 14, cell: (r) => label(r.onboarding?.academic_level, LEVEL_LABELS) },
  { title: 'École', width: 36, cell: (r) => r.onboarding?.school_name ?? null },
  { title: 'Traces du travail', width: 28, cell: (r) => labelList(r.onboarding?.work_tools, WORK_TOOL_LABELS) },
  { title: 'Difficultés', width: 36, cell: (r) => labelList(r.onboarding?.blockers, BLOCKER_LABELS) },
  { title: 'Canal', width: 16, cell: (r) => label(r.onboarding?.acquisition_channel, CHANNEL_LABELS) },
  // Activity and score
  { title: 'Dernière activité', width: 14, cell: (r) => timestampCell(r.lead.last_active_at) },
  { title: 'Score', width: 8, cell: (r) => r.lead.score },
  { title: 'Catégorie', width: 11, cell: (r) => TIER_LABELS[r.lead.tier] },
  { title: 'Action suggérée', width: 22, cell: (r) => ACTION_LABELS[r.lead.suggested_action] },
];

function todayStamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Builds and downloads the .xlsx file. Returns the number of exported leads. */
export async function exportLeadsToExcel(
  filters: ExportFilters,
  onProgress?: ExportProgress,
  signal?: AbortSignal
): Promise<number> {
  const [rows, { default: writeExcelFile }] = await Promise.all([
    collectRows(filters, onProgress, signal),
    import('write-excel-file/browser'), // loaded only when exporting
  ]);

  await writeExcelFile(rows, {
    sheet: 'Leads',
    columns: COLUMNS.map((c) => ({ header: header(c.title), cell: c.cell, width: c.width })),
    dateFormat: 'dd/mm/yyyy',
    stickyRowsCount: 1,
  }).toFile(`memoflow-leads-${todayStamp()}.xlsx`);

  return rows.length;
}
