import { apiFetch, ApiError } from './api';

/**
 * Onboarding "Personnalise ton espace", shown until the user has submitted it.
 *
 * Backend contract: "Onboarding and Lead Scoring API Contract" (draft).
 *   GET /onboarding/me          -> OnboardingResponse (never 404 once shipped)
 *   PUT /onboarding/me          -> full replace of the answers
 *   PUT /onboarding/me/consent  -> marketing consent only (409 before first submit)
 * Score, tier and suggested action are admin-only: never shown to the user.
 *
 * While the routes are not deployed (404) or unreachable, completion is remembered
 * in localStorage and answers are kept locally, then re-sent on the next session.
 */

export type Persona = 'apprentice' | 'intern' | 'student' | 'other';
export type DeliverableType = 'thesis' | 'apprenticeship_report' | 'internship_report' | 'other';
export type AcademicLevel = 'l3' | 'm1' | 'm2' | 'other';
export type WorkTool = 'trello' | 'notion' | 'teams' | 'slack' | 'email' | 'drive' | 'other';
export type Blocker = 'getting_started' | 'finding_past_work' | 'structuring' | 'writing' | 'lack_of_time';
export type AcquisitionChannel = 'friend' | 'school' | 'tiktok' | 'instagram' | 'linkedin' | 'google' | 'other';

export const SCHOOL_NAME_MAX_LENGTH = 120;

export interface OnboardingAnswers {
  persona: Persona;
  deliverable_type: DeliverableType;
  /** YYYY-MM-DD */
  due_date: string;
  academic_level: AcademicLevel;
  school_name?: string | null;
  /** [] = none of these */
  work_tools: WorkTool[];
  /** at least 1 */
  blockers: Blocker[];
  acquisition_channel: AcquisitionChannel;
  marketing_opt_in: boolean;
}

export interface OnboardingResponse {
  completed: boolean;
  persona: Persona | null;
  deliverable_type: DeliverableType | null;
  due_date: string | null;
  academic_level: AcademicLevel | null;
  school_name: string | null;
  work_tools: WorkTool[] | null;
  blockers: Blocker[] | null;
  acquisition_channel: AcquisitionChannel | null;
  marketing_opt_in: boolean;
  marketing_opt_in_at: string | null;
  submitted_at: string | null;
}

export interface Choice<T extends string> {
  value: T;
  label: string;
}

export const PERSONA_CHOICES: Choice<Persona>[] = [
  { value: 'apprentice', label: 'Alternant' },
  { value: 'intern', label: 'Stagiaire' },
  { value: 'student', label: 'Étudiant sans alternance' },
  { value: 'other', label: 'Autre' },
];

export const DELIVERABLE_CHOICES: Choice<DeliverableType>[] = [
  { value: 'thesis', label: 'Mémoire' },
  { value: 'apprenticeship_report', label: "Rapport d'alternance" },
  { value: 'internship_report', label: 'Rapport de stage' },
  { value: 'other', label: 'Autre' },
];

export const LEVEL_CHOICES: Choice<AcademicLevel>[] = [
  { value: 'l3', label: 'L3' },
  { value: 'm1', label: 'M1' },
  { value: 'm2', label: 'M2' },
  { value: 'other', label: 'Autre (bac+3 à bac+5)' },
];

export const WORK_TOOL_CHOICES: Choice<WorkTool>[] = [
  { value: 'trello', label: 'Trello' },
  { value: 'notion', label: 'Notion' },
  { value: 'teams', label: 'Teams' },
  { value: 'slack', label: 'Slack' },
  { value: 'email', label: 'Mails' },
  { value: 'drive', label: 'Drive' },
  { value: 'other', label: 'Autre' },
];

export const BLOCKER_CHOICES: Choice<Blocker>[] = [
  { value: 'getting_started', label: 'Démarrer' },
  { value: 'finding_past_work', label: "Retrouver ce que j'ai fait" },
  { value: 'structuring', label: 'Structurer' },
  { value: 'writing', label: 'Rédiger' },
  { value: 'lack_of_time', label: 'Le temps' },
];

export const CHANNEL_CHOICES: Choice<AcquisitionChannel>[] = [
  { value: 'friend', label: 'Ami ou camarade' },
  { value: 'school', label: 'École' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'google', label: 'Google' },
  { value: 'other', label: 'Autre' },
];

/** Today in the user's local time zone, YYYY-MM-DD (used to block past due dates). */
export function localTodayIso(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// ─── Local fallback (routes not deployed yet, server unreachable) ────────────
const doneKey = (userId: string) => `memoflow_onboarding_done_${userId}`;
const pendingKey = (userId: string) => `memoflow_onboarding_pending_${userId}`;

const isLocallyDone = (userId: string) => localStorage.getItem(doneKey(userId)) !== null;
const hasPending = (userId: string) => localStorage.getItem(pendingKey(userId)) !== null;

/** 400 means the body itself is invalid: re-sending it would never succeed. */
const isRejected = (err: unknown) => err instanceof ApiError && err.statusCode === 400;

function putAnswers(answers: OnboardingAnswers): Promise<OnboardingResponse> {
  return apiFetch<OnboardingResponse>('/onboarding/me', {
    method: 'PUT',
    body: JSON.stringify(answers),
  });
}

/** Re-sends answers that previously failed to reach the backend. */
async function flushPendingOnboarding(userId: string): Promise<void> {
  const raw = localStorage.getItem(pendingKey(userId));
  if (!raw) return;
  try {
    await putAnswers(JSON.parse(raw) as OnboardingAnswers);
    localStorage.removeItem(pendingKey(userId));
  } catch (err) {
    if (isRejected(err)) {
      console.error('Pending onboarding answers rejected by the backend, dropped:', err);
      localStorage.removeItem(pendingKey(userId));
      localStorage.removeItem(doneKey(userId));
    } else {
      console.warn('Pending onboarding answers still not sent:', err);
    }
  }
}

/**
 * Whether the questionnaire must be shown. Never throws: re-sends queued answers first,
 * then trusts `completed` from the backend, falling back to local memory if the route fails.
 */
export async function needsOnboarding(userId: string): Promise<boolean> {
  await flushPendingOnboarding(userId);
  try {
    const onboarding = await apiFetch<OnboardingResponse>('/onboarding/me');
    if (onboarding.completed) return false;
    // Answers given but still waiting to be sent: do not ask again
    return !hasPending(userId);
  } catch (err) {
    console.warn('Onboarding status unavailable, using local state:', err);
    return !isLocallyDone(userId);
  }
}

/**
 * Sends the answers. Never throws: if the backend is unreachable or the route is not
 * deployed yet, answers are kept locally and re-sent by `needsOnboarding` next session.
 */
export async function submitOnboarding(userId: string, answers: OnboardingAnswers): Promise<boolean> {
  localStorage.setItem(doneKey(userId), new Date().toISOString());
  try {
    await putAnswers(answers);
    localStorage.removeItem(pendingKey(userId));
    return true;
  } catch (err) {
    if (isRejected(err)) {
      console.error('Onboarding answers rejected by the backend:', err);
    } else {
      console.error('Onboarding answers could not be sent, kept for retry:', err);
      localStorage.setItem(pendingKey(userId), JSON.stringify(answers));
    }
    return false;
  }
}

// ─── Consent given on the signup form ────────────────────────────────────────
// POST /auth/register takes no consent field: the choice is kept in this browser
// and pre-fills the questionnaire, which sends it with PUT /onboarding/me.
const signupConsentKey = (email: string) => `memoflow_signup_marketing_opt_in_${email.trim().toLowerCase()}`;

export function rememberSignupConsent(email: string, optIn: boolean): void {
  localStorage.setItem(signupConsentKey(email), optIn ? 'true' : 'false');
}

export function getSignupConsent(email: string): boolean {
  return localStorage.getItem(signupConsentKey(email)) === 'true';
}

export function forgetSignupConsent(email: string): void {
  localStorage.removeItem(signupConsentKey(email));
}

// ─── Settings: read answers and change marketing consent ─────────────────────
export function getOnboarding(): Promise<OnboardingResponse> {
  return apiFetch<OnboardingResponse>('/onboarding/me');
}

export function updateMarketingConsent(marketingOptIn: boolean): Promise<OnboardingResponse> {
  return apiFetch<OnboardingResponse>('/onboarding/me/consent', {
    method: 'PUT',
    body: JSON.stringify({ marketing_opt_in: marketingOptIn }),
  });
}

// ─── School autocomplete (French higher-education open data) ─────────────────
const SCHOOLS_API =
  'https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-etablissements-enseignement-superieur/records';

export async function searchSchools(query: string, signal?: AbortSignal): Promise<string[]> {
  const q = query.trim().replace(/"/g, '');
  if (q.length < 2) return [];
  const params = new URLSearchParams({
    where: `search(uo_lib, "${q}")`,
    select: 'uo_lib',
    limit: '8',
  });
  const res = await fetch(`${SCHOOLS_API}?${params}`, { signal });
  if (!res.ok) return [];
  const data = (await res.json()) as { results?: { uo_lib?: string }[] };
  const names = (data.results || []).map((r) => r.uo_lib).filter((n): n is string => !!n);
  return [...new Set(names)];
}
