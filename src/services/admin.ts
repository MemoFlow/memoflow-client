import { apiFetch } from './api';
import {
  PERSONA_CHOICES,
  DELIVERABLE_CHOICES,
  LEVEL_CHOICES,
  WORK_TOOL_CHOICES,
  BLOCKER_CHOICES,
  CHANNEL_CHOICES,
} from './onboarding';
import type {
  AcademicLevel,
  AcquisitionChannel,
  Blocker,
  Choice,
  DeliverableType,
  OnboardingResponse,
  Persona,
  WorkTool,
} from './onboarding';

/**
 * Admin lead-scoring routes ("Onboarding and Lead Scoring API Contract", admin section).
 * All need the `admin` role; the backend answers 403 otherwise.
 */

export type LeadTier = 'hot' | 'warm' | 'cold';
export type SuggestedAction = 'interview_and_pro_offer' | 'scheduled_emails' | 'newsletter' | 'no_outreach';
export type LeadSignalType = 'export_paywall_hit';
export type ConnectorProvider = 'trello' | 'notion' | 'github';
export type ScoreRule =
  | 'due_within_3_months'
  | 'due_within_3_to_6_months'
  | 'persona_apprentice'
  | 'persona_intern'
  | 'cited_trello'
  | 'connected_tool'
  | 'export_paywall_hit';

export interface LeadSummary {
  user_id: string;
  email: string;
  display_name: string;
  score: number;
  tier: LeadTier;
  suggested_action: SuggestedAction;
  score_computed_at: string | null;
  onboarding_completed: boolean;
  persona: Persona | null;
  due_date: string | null;
  marketing_opt_in: boolean;
  registered_at: string;
  last_active_at: string | null;
}

export interface LeadDetail extends LeadSummary {
  breakdown: { rule: ScoreRule; points: number }[];
  onboarding: OnboardingResponse;
  active_connectors: ConnectorProvider[];
  signals: {
    type: LeadSignalType;
    first_seen_at: string;
    last_seen_at: string;
    occurrences: number;
  }[];
}

export interface LeadsPage {
  items: LeadSummary[];
  total: number;
  page: number;
  limit: number;
}

export interface LeadStats {
  generated_at: string;
  total_leads: number;
  tiers: Record<LeadTier, number>;
  suggested_actions: Record<SuggestedAction, number>;
  onboarding: { not_started: number; completed: number };
  marketing_opt_in: number;
  connected_tool: number;
  signals: Record<LeadSignalType, number>;
  distributions: {
    persona: Record<Persona, number>;
    deliverable_type: Record<DeliverableType, number>;
    academic_level: Record<AcademicLevel, number>;
    work_tools: Record<WorkTool, number>;
    blockers: Record<Blocker, number>;
    acquisition_channel: Record<AcquisitionChannel, number>;
  };
}

export interface LeadFilters {
  tier?: LeadTier;
  onboarding_completed?: boolean;
  marketing_opt_in?: boolean;
  page: number;
  limit: number;
}

export function fetchLeads(filters: LeadFilters, signal?: AbortSignal): Promise<LeadsPage> {
  const params = new URLSearchParams({ page: String(filters.page), limit: String(filters.limit) });
  if (filters.tier) params.set('tier', filters.tier);
  if (filters.onboarding_completed !== undefined) params.set('onboarding_completed', String(filters.onboarding_completed));
  if (filters.marketing_opt_in !== undefined) params.set('marketing_opt_in', String(filters.marketing_opt_in));
  return apiFetch<LeadsPage>(`/leads?${params}`, { signal });
}

export function fetchLeadStats(signal?: AbortSignal): Promise<LeadStats> {
  return apiFetch<LeadStats>('/leads/stats', { signal });
}

export function fetchLead(userId: string, signal?: AbortSignal): Promise<LeadDetail> {
  return apiFetch<LeadDetail>(`/leads/${encodeURIComponent(userId)}`, { signal });
}

// ─── French labels ───────────────────────────────────────────────────────────
const toMap = <T extends string>(choices: Choice<T>[]) =>
  Object.fromEntries(choices.map((c) => [c.value, c.label])) as Record<T, string>;

export const PERSONA_LABELS = toMap(PERSONA_CHOICES);
export const DELIVERABLE_LABELS = toMap(DELIVERABLE_CHOICES);
export const LEVEL_LABELS = toMap(LEVEL_CHOICES);
export const WORK_TOOL_LABELS = toMap(WORK_TOOL_CHOICES);
export const BLOCKER_LABELS = toMap(BLOCKER_CHOICES);
export const CHANNEL_LABELS = toMap(CHANNEL_CHOICES);

export const TIER_LABELS: Record<LeadTier, string> = {
  hot: 'Chaud',
  warm: 'Tiède',
  cold: 'Froid',
};

export const ACTION_LABELS: Record<SuggestedAction, string> = {
  interview_and_pro_offer: 'Entretien + offre Pro',
  scheduled_emails: 'Emails programmés',
  newsletter: 'Newsletter',
  no_outreach: 'Aucun contact',
};

export const RULE_LABELS: Record<ScoreRule, string> = {
  due_within_3_months: 'Rendu dans moins de 3 mois',
  due_within_3_to_6_months: 'Rendu dans 3 à 6 mois',
  persona_apprentice: 'Alternant',
  persona_intern: 'Stagiaire',
  cited_trello: 'Utilise Trello',
  connected_tool: 'Application connectée',
  export_paywall_hit: "Offre Pro vue à l'export",
};

export const SIGNAL_LABELS: Record<LeadSignalType, string> = {
  export_paywall_hit: "Offre Pro vue à l'export",
};

export const CONNECTOR_LABELS: Record<ConnectorProvider, string> = {
  trello: 'Trello',
  notion: 'Notion',
  github: 'GitHub',
};
