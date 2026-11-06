import { io, Socket } from 'socket.io-client';

const API_BASE = (import.meta.env.VITE_API_URL);

// Token helper functions
export function getToken(): string | null {
  return localStorage.getItem('memoflow_token');
}

export function setToken(token: string): void {
  resetGuestStore();
  localStorage.setItem('memoflow_token', token);
}

export type LogoutReason = 'logout' | 'expired';

/** Ends the session. 'expired' = the API rejected the token (401), e.g. after a password reset. */
export function clearToken(reason: LogoutReason = 'logout'): void {
  resetGuestStore();
  localStorage.removeItem('memoflow_token');
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent<LogoutReason>('auth_logout', { detail: reason }));
  }
}

/** Fired when a route answers 403 "Email not verified" */
export const EMAIL_NOT_VERIFIED_EVENT = 'email_not_verified';

// Custom API Error class to hold status code and error messages
export class ApiError extends Error {
  statusCode: number;
  error: string;
  path?: string;
  /** Untranslated backend `message` (string, or string[] for validation errors) */
  rawMessage?: string | string[];

  constructor(message: string, statusCode: number, error: string, path?: string, rawMessage?: string | string[]) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.error = error;
    this.path = path;
    this.rawMessage = rawMessage;
  }
}

/** Reset or verification link that is unknown, used or expired (the API gives no reason) */
export const isDeadLinkError = (e: unknown) =>
  e instanceof ApiError && e.statusCode === 400 && e.rawMessage === 'Invalid or expired token';

/** Route that requires a verified email address */
export const isEmailNotVerifiedError = (e: unknown) =>
  e instanceof ApiError && e.statusCode === 403 && e.rawMessage === 'Email not verified';

// ─── Guest mode ───────────────────────────────────────────────────────────────
// Without a session, the app stays usable but data lives only in memory:
// nothing is sent to the backend and everything is lost on page reload.
export const GUEST_DISPLAY_NAME = 'Invité';
export const GUEST_FEATURE_LOCKED_MESSAGE =
  'Créez un compte ou connectez-vous pour utiliser cette fonctionnalité.';

let guestDocuments: DocumentResponseDto[] = [];
let guestSections: Record<string, SectionResponseDto[]> = {};
let guestIdCounter = 0;

export function resetGuestStore(): void {
  guestDocuments = [];
  guestSections = {};
}

function guestId(kind: 'doc' | 'sec'): string {
  guestIdCounter += 1;
  return `guest-${kind}-${Date.now()}-${guestIdCounter}`;
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

interface GuestRequestBody {
  title?: string;
  content?: string;
  docType?: string;
  status?: string;
  styleConfig?: Record<string, unknown>;
}

function parseBody(options: RequestInit): GuestRequestBody {
  if (typeof options.body !== 'string') return {};
  try {
    return JSON.parse(options.body);
  } catch {
    return {};
  }
}

function guestNotFound(path: string): never {
  throw new ApiError('Ressource introuvable.', 404, 'NotFound', path);
}

async function guestFetch<T>(path: string, options: RequestInit): Promise<T> {
  const method = (options.method || 'GET').toUpperCase();
  const body = parseBody(options);
  const now = new Date().toISOString();
  const parts = path.split('?')[0].split('/').filter(Boolean);

  // Gamification: guests have no progression
  if (path === '/gamification/me') {
    return { xp: 0, level: 1, milestones: [], today_missions: [] } as unknown as T;
  }
  if (path === '/gamification/leaderboard' || (path === '/connectors' && method === 'GET')) {
    return [] as unknown as T;
  }

  if (parts[0] === 'documents') {
    const docId = parts[1];

    // /documents
    if (!docId) {
      if (method === 'POST') {
        const doc: DocumentResponseDto = {
          id: guestId('doc'),
          user_id: 'guest',
          title: body.title || 'Document sans titre',
          doc_type: body.docType || 'thesis',
          status: body.status || 'draft',
          style_config: body.styleConfig || {},
          created_at: now,
          updated_at: now,
        };
        guestDocuments.push(doc);
        guestSections[doc.id] = [];
        return doc as unknown as T;
      }
      return [...guestDocuments] as unknown as T;
    }

    const doc = guestDocuments.find((d) => d.id === docId);
    if (!doc) guestNotFound(path);

    // /documents/:id
    if (parts.length === 2) {
      if (method === 'PATCH') {
        Object.assign(doc, {
          ...(body.title !== undefined && { title: body.title }),
          ...(body.docType !== undefined && { doc_type: body.docType }),
          ...(body.status !== undefined && { status: body.status }),
          ...(body.styleConfig !== undefined && { style_config: body.styleConfig }),
          updated_at: now,
        });
        return { ...doc } as unknown as T;
      }
      if (method === 'DELETE') {
        guestDocuments = guestDocuments.filter((d) => d.id !== docId);
        delete guestSections[docId];
        return {} as T;
      }
      return { ...doc } as unknown as T;
    }

    // /documents/:id/sections[/:sectionId]
    if (parts[2] === 'sections') {
      const list = (guestSections[docId] ??= []);
      const sectionId = parts[3];

      if (!sectionId) {
        if (method === 'POST') {
          const content = body.content || '';
          const section: SectionResponseDto = {
            id: guestId('sec'),
            document_id: docId,
            title: body.title || 'Nouvelle section',
            content,
            order: list.length,
            status: body.status || 'draft',
            word_count: countWords(content),
            created_at: now,
            updated_at: now,
          };
          list.push(section);
          return { ...section } as unknown as T;
        }
        return list.map((s) => ({ ...s })) as unknown as T;
      }

      const section = list.find((s) => s.id === sectionId);
      if (!section) guestNotFound(path);

      if (method === 'PATCH') {
        Object.assign(section, {
          ...(body.title !== undefined && { title: body.title }),
          ...(body.status !== undefined && { status: body.status }),
          ...(body.content !== undefined && { content: body.content, word_count: countWords(body.content) }),
          updated_at: now,
        });
        return { ...section } as unknown as T;
      }
      if (method === 'DELETE') {
        guestSections[docId] = list
          .filter((s) => s.id !== sectionId)
          .map((s, i) => ({ ...s, order: i }));
        return {} as T;
      }
      return { ...section } as unknown as T;
    }
  }

  // Everything else (templates, AI, connectors, versions...) requires an account
  throw new ApiError(GUEST_FEATURE_LOCKED_MESSAGE, 401, 'GuestMode', path);
}

// Main fetch wrapper
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  // Guest mode: no session -> serve everything from the in-memory store (nothing is persisted)
  if (!token && !path.startsWith('/auth/')) {
    return guestFetch<T>(path, options);
  }

  const url = `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Ensure JSON request format if body is present
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (err) {
    // Network failure, DNS, CORS, server unreachable... ("Failed to fetch")
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    console.error(`[API] Network error on ${path}:`, err);
    throw new ApiError(NETWORK_ERROR_MESSAGE, 0, 'NetworkError', path);
  }

  if (response.status === 204) {
    return {} as T;
  }

  if (!response.ok) {
    let errorData: Record<string, unknown> = {};
    try {
      const json = await response.json();
      if (typeof json === 'object' && json !== null) errorData = json as Record<string, unknown>;
    } catch {
      // Non-JSON error body (proxy / gateway HTML page...): rely on the status code only
    }

    const status = typeof errorData.statusCode === 'number' ? errorData.statusCode : response.status;

    // Handle token expiration / auth failure (not wrong credentials on /auth/login)
    if (response.status === 401 && token) {
      clearToken('expired');
    }

    const rawMessage =
      typeof errorData.message === 'string' ||
      (Array.isArray(errorData.message) && errorData.message.every((m) => typeof m === 'string'))
        ? (errorData.message as string | string[])
        : undefined;

    if (status === 403 && rawMessage === 'Email not verified') {
      window.dispatchEvent(new Event(EMAIL_NOT_VERIFIED_EVENT));
    }

    console.error(`[API] ${status} on ${path}:`, errorData.message ?? response.statusText);
    throw new ApiError(
      toFriendlyErrorMessage(status, errorData.message, path),
      status,
      typeof errorData.error === 'string' ? errorData.error : 'HttpError',
      typeof errorData.path === 'string' ? errorData.path : path,
      rawMessage
    );
  }

  try {
    return (await response.json()) as T;
  } catch (err) {
    // e.g. an HTML page returned instead of JSON (wrong API URL / proxy misconfiguration)
    console.error(`[API] Invalid JSON response on ${path}:`, err);
    throw new ApiError(INVALID_RESPONSE_MESSAGE, response.status, 'InvalidResponse', path);
  }
}

// ─── Error messages ───────────────────────────────────────────────────────────
const NETWORK_ERROR_MESSAGE =
  'Impossible de joindre le serveur MemoFlow. Vérifiez votre connexion internet puis réessayez.';
const INVALID_RESPONSE_MESSAGE =
  'Le serveur a renvoyé une réponse inattendue. Réessayez dans quelques instants.';

const FIELD_LABELS: Record<string, string> = {
  email: "l'adresse email",
  password: 'le mot de passe',
  new_password: 'le nouveau mot de passe',
  token: 'le lien',
  display_name: "le nom d'affichage",
  displayName: "le nom d'affichage",
  title: 'le titre',
  content: 'le contenu',
  prompt: 'la consigne',
};

function fieldLabel(field: string): string {
  return FIELD_LABELS[field] ?? `le champ « ${field} »`;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Translates a single backend (NestJS / class-validator) message into French, or null if unknown. */
function translateBackendMessage(raw: string): string | null {
  const msg = raw.trim();
  let m: RegExpMatchArray | null;

  if (/^invalid or expired token$/i.test(msg)) return "Ce lien n'est plus valide.";
  if (/^email not verified$/i.test(msg)) return 'Confirmez votre adresse email pour utiliser cette fonctionnalité.';
  if (/invalid (email|credentials)|email or password/i.test(msg)) return 'Email ou mot de passe incorrect.';
  if (/(email|user|account).*(already|exists)|already (exists|registered|in use|taken)/i.test(msg)) {
    return 'Un compte existe déjà avec cette adresse email.';
  }
  if ((m = msg.match(/^(\w+) must be an email$/i))) return `${capitalize(fieldLabel(m[1]))} n'est pas valide.`;
  if ((m = msg.match(/^(\w+) must be longer than or equal to (\d+) characters$/i))) {
    return `${capitalize(fieldLabel(m[1]))} doit contenir au moins ${m[2]} caractères.`;
  }
  if ((m = msg.match(/^(\w+) must be shorter than or equal to (\d+) characters$/i))) {
    return `${capitalize(fieldLabel(m[1]))} doit contenir au maximum ${m[2]} caractères.`;
  }
  if ((m = msg.match(/^(\w+) should not be empty$/i))) return `${capitalize(fieldLabel(m[1]))} est requis.`;
  if ((m = msg.match(/^(\w+) must be a string$/i))) return `${capitalize(fieldLabel(m[1]))} n'est pas valide.`;
  if ((m = msg.match(/^property (\w+) should not exist$/i))) return `Champ inattendu : ${m[1]}.`;
  return null;
}

function toFriendlyErrorMessage(status: number, backendMessage: unknown, path: string): string {
  const messages = (Array.isArray(backendMessage) ? backendMessage : [backendMessage])
    .filter((x): x is string => typeof x === 'string' && x.trim() !== '');
  const translated = messages.map(translateBackendMessage).filter((x): x is string => x !== null);
  if (translated.length > 0) return [...new Set(translated)].join(' ');

  switch (status) {
    case 400:
      return 'Certaines informations saisies sont invalides. Vérifiez le formulaire et réessayez.';
    case 401:
      return path.startsWith('/auth/login')
        ? 'Email ou mot de passe incorrect.'
        : 'Votre session a expiré. Veuillez vous reconnecter.';
    case 403:
      return "Vous n'avez pas les droits nécessaires pour effectuer cette action.";
    case 404:
      return 'La ressource demandée est introuvable.';
    case 409:
      return path.startsWith('/auth/register')
        ? 'Un compte existe déjà avec cette adresse email.'
        : 'Cette action entre en conflit avec des données existantes.';
    case 413:
      return 'Le contenu envoyé est trop volumineux.';
    case 429:
      return 'Trop de tentatives. Patientez quelques instants avant de réessayer.';
    case 502:
    case 503:
    case 504:
      return 'Le serveur MemoFlow est momentanément indisponible (il peut être en cours de démarrage). Réessayez dans quelques secondes.';
    default:
      return status >= 500
        ? 'Une erreur est survenue sur le serveur. Réessayez dans quelques instants.'
        : `Une erreur inattendue est survenue (code ${status}).`;
  }
}

// WebSocket client management
let socketInstance: Socket | null = null;

export interface SocketCallbacks {
  onReady?: () => void;
  onStatus?: (payload: { jobId: string; status: 'pending' | 'running' }) => void;
  onCompleted?: (payload: { jobId: string; status: 'completed'; result: unknown }) => void;
  onFailed?: (payload: { jobId: string; status: 'failed'; errorCode: string | null; errorMessage: string | null }) => void;
  onError?: (payload: { jobId: string; message: string }) => void;
  onDisconnect?: () => void;
}

export function connectSocket(token: string, callbacks: SocketCallbacks): Socket {
  if (socketInstance) {
    socketInstance.disconnect();
  }

  // Establish connection with token in handshake auth block
  socketInstance = io(API_BASE, {
    auth: {
      token,
    },
    transports: ['websocket', 'polling'],
  });

  socketInstance.on('connect', () => {
    console.log('Socket.IO connected to backend');
  });

  socketInstance.on('ready', () => {
    console.log('Socket.IO authenticated and ready');
    if (callbacks.onReady) callbacks.onReady();
  });

  socketInstance.on('planning.status', (data: { jobId: string; status: 'pending' | 'running' }) => {
    console.log('Socket event planning.status:', data);
    if (callbacks.onStatus) callbacks.onStatus(data);
  });

  socketInstance.on('planning.completed', (data: { jobId: string; status: 'completed'; result: unknown }) => {
    console.log('Socket event planning.completed:', data);
    if (callbacks.onCompleted) callbacks.onCompleted(data);
  });

  socketInstance.on('planning.failed', (data: { jobId: string; status: 'failed'; errorCode: string | null; errorMessage: string | null }) => {
    console.log('Socket event planning.failed:', data);
    if (callbacks.onFailed) callbacks.onFailed(data);
  });

  socketInstance.on('planning.error', (data: { jobId: string; message: string }) => {
    console.warn('Socket event planning.error:', data);
    if (callbacks.onError) callbacks.onError(data);
  });

  socketInstance.on('disconnect', () => {
    console.log('Socket.IO disconnected');
    if (callbacks.onDisconnect) callbacks.onDisconnect();
  });

  return socketInstance;
}

export function disconnectSocket(): void {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
}

export function subscribeToJob(jobId: string): void {
  if (socketInstance && socketInstance.connected) {
    console.log('Emitting subscribe for jobId:', jobId);
    socketInstance.emit('subscribe', { jobId });
  } else {
    console.warn('Cannot subscribe, socket is not connected');
  }
}

// API DTO Types
export interface UserResponseDto {
  id: string;
  email: string;
  display_name: string;
  role: string;
  xp: number;
  level: number;
  last_active_at: string | null;
  disabled_at?: string | null;
  /** false until the user clicks the link of the verification email */
  email_verified?: boolean;
}

export interface ConnectorResponseDto {
  id: string;
  provider: 'trello' | 'notion' | 'github';
  status: 'initiated' | 'active' | 'revoked' | 'failed';
  connected_at: string | null;
  created_at: string;
}

export interface InitiateConnectionResponseDto {
  redirect_url: string;
  connection_id: string;
  status: 'initiated' | 'active' | 'revoked' | 'failed';
}

export interface PlanningJobResponseDto {
  job_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  prompt: string;
  connectors: string[];
  result: unknown;
  error_code: string | null;
  error_message: string | null;
  created_at: string;
  started_at: string | null;
  finished_at: string | null;
}

// === AUTH SCHEMAS ===
export interface RegisterUserDto {
  email: string;
  password?: string; // min length 8
  display_name: string;
}

export interface LoginUserDto {
  email: string;
  password?: string;
}

export interface LoginResponseDto {
  accessToken: string;
}

// === AI SUGGESTION SCHEMAS ===
export interface CreateSuggestionDto {
  featureType: string; // e.g. 'suggestion'
}

export interface SuggestionResponseDto {
  id: string;
  section_id: string;
  user_id: string;
  feature_type: string;
  original_text: string;
  suggested_text: string;
  status: 'pending' | 'accepted' | 'rejected';
  prompt_version: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewSuggestionDto {
  status: 'accepted' | 'rejected';
}

// === DOCUMENT SCHEMAS ===
export interface CreateDocumentDto {
  title: string;
  docType: string;
  status?: string;
  styleConfig?: Record<string, any>;
}

export interface DocumentResponseDto {
  id: string;
  user_id: string;
  title: string;
  doc_type: string;
  status: string;
  style_config: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface UpdateDocumentDto {
  title?: string;
  docType?: string;
  status?: string;
  styleConfig?: Record<string, any>;
}

// === SECTION SCHEMAS ===
export interface CreateSectionDto {
  title: string;
  content: string;
  status?: string;
}

export interface SectionResponseDto {
  id: string;
  document_id: string;
  title: string;
  content: string;
  order: number;
  status: string;
  word_count: number;
  created_at: string;
  updated_at: string;
}

export interface ReorderSectionsDto {
  sectionIds: string[];
}

export interface UpdateSectionDto {
  title?: string;
  content?: string;
  status?: string;
}

// === PLANNING JOB SCHEMAS ===
export interface SubmitPlanningJobDto {
  prompt: string;
  connectors?: string[];
  documentId?: string;
  sectionId?: string;
}

// === DOCUMENT VERSION SCHEMAS ===
export interface SaveVersionDto {
  label?: string;
}

export interface SectionSnapshotResponseDto {
  title: string;
  content: string;
  order: number;
  status: string;
  word_count: number;
}

export interface VersionResponseDto {
  id: string;
  document_id: string;
  user_id: string;
  version: number;
  label: string | null;
  sections_snapshot: SectionSnapshotResponseDto[];
  saved_at: string;
}

export interface VersionMetadataResponseDto {
  id: string;
  document_id: string;
  version: number;
  label: string | null;
  saved_at: string;
  section_count: number;
}

export interface RestoreResultDto {
  document_id: string;
  version_id: string;
  version: number;
  sections_restored: number;
}

// === TEMPLATE SCHEMAS ===
export interface TemplateSectionDto {
  title: string;
  order: number;
  wordCountMin: number;
  wordCountMax: number;
  isRequired?: boolean;
}

export interface CreateTemplateDto {
  title: string;
  docType: string;
  scope: string;
  styleConfig?: Record<string, any>;
  isPublished?: boolean;
  sections: TemplateSectionDto[];
}

export interface TemplateSectionResponseDto {
  id: string;
  title: string;
  order: number;
  word_count_min: number;
  word_count_max: number;
  is_required: boolean;
}

export interface TemplateResponseDto {
  id: string;
  title: string;
  doc_type: string;
  scope: string;
  created_by: string | null;
  style_config: Record<string, any> | null;
  is_published: boolean;
  sections: TemplateSectionResponseDto[];
  created_at: string;
  updated_at: string;
}

export interface UpdateTemplateDto {
  title?: string;
  docType?: string;
  scope?: string;
  styleConfig?: Record<string, any>;
  isPublished?: boolean;
  sections?: TemplateSectionDto[];
}

export interface ApplyTemplateDto {
  documentId: string;
}

export interface ApplyTemplateResponseDto {
  document_template_id: string;
  document_id: string;
  template_id: string;
  applied_at: string;
  sections_created: number;
}

// === GAMIFICATION SCHEMAS ===
export interface MilestoneResponseDto {
  id: string;
  document_id: string;
  milestone_type: string;
  xp_awarded: number;
  created_at: string;
}

export interface DailyMissionResponseDto {
  id: string;
  code: string;
  description: string;
  xp_reward: number;
  criteria: Record<string, any>;
}

export interface TodayMissionResponseDto {
  mission: DailyMissionResponseDto;
  progress: number;
  completed: boolean;
}

export interface GamificationMeResponseDto {
  xp: number;
  level: number;
  milestones: MilestoneResponseDto[];
  today_missions: TodayMissionResponseDto[];
}

export interface LeaderboardEntryResponseDto {
  user_id: string;
  display_name: string;
  xp: number;
  level: number;
}
