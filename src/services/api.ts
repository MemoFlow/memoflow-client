import { io, Socket } from 'socket.io-client';

const API_BASE = (import.meta.env.VITE_API_URL || 'https://memoflow-dev-api.onrender.com/').replace(/\/$/, '');

// Token helper functions
export function getToken(): string | null {
  return localStorage.getItem('memoflow_token');
}

export function setToken(token: string): void {
  localStorage.setItem('memoflow_token', token);
}

export function clearToken(): void {
  localStorage.removeItem('memoflow_token');
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth_logout'));
  }
}

// Custom API Error class to hold status code and error messages
export class ApiError extends Error {
  statusCode: number;
  error: string;
  path?: string;

  constructor(message: string, statusCode: number, error: string, path?: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.error = error;
    this.path = path;
  }
}

// Mock states for admin@memoflow.fr offline mode
let mockJobStatus: 'pending' | 'running' | 'completed' = 'pending';
let mockJobTimeout1: number | null = null;
let mockJobTimeout2: number | null = null;

let mockDocuments: any[] = [
  {
    id: 'mock-doc-1',
    user_id: 'mock-admin-uuid',
    title: 'Mémoire Master 2 - Linguistique Neurologique',
    doc_type: 'thesis',
    status: 'draft',
    style_config: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

let mockSections: { [docId: string]: any[] } = {
  'mock-doc-1': [
    {
      id: 'mock-sec-1',
      document_id: 'mock-doc-1',
      title: 'Introduction & Problématique',
      content: "La relation entre les stimuli environnementaux et l'état de « flux » dans la recherche académique...",
      order: 0,
      status: 'draft',
      word_count: 50,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'mock-sec-2',
      document_id: 'mock-doc-1',
      title: 'Cadre Méthodologique',
      content: "Pour mesurer l'efficacité de ce protocole, nous avons mené une étude sur 12 mois...",
      order: 1,
      status: 'draft',
      word_count: 40,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
};

// Main fetch wrapper
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  // Intercept authentication for admin@memoflow.fr
  if (path === '/auth/login' && options.body) {
    try {
      const body = JSON.parse(options.body as string);
      if (body.email === 'admin@memoflow.fr' && body.password === '12345678') {
        console.log('[Mock API] Intercepted admin login');
        return { accessToken: 'mock_admin_token' } as unknown as T;
      }
    } catch (e) {
      // Ignored
    }
  }

  // Intercept other endpoints when logged in as mock admin
  if (token === 'mock_admin_token') {
    console.log(`[Mock API] Intercepted ${options.method || 'GET'} ${path}`);
    
    if (path === '/users/me') {
      return {
        id: 'mock-admin-uuid',
        email: 'admin@memoflow.fr',
        display_name: 'Administrateur',
        role: 'admin',
        xp: 12500,
        level: 25,
        last_active_at: new Date().toISOString()
      } as unknown as T;
    }

    if (path === '/connectors') {
      // Returns a default active Notion connector and an initiated Trello connector for visual completeness
      return [
        { id: 'notion-id', provider: 'notion', status: 'active', connected_at: new Date().toISOString(), created_at: new Date().toISOString() },
        { id: 'trello-id', provider: 'trello', status: 'initiated', connected_at: null, created_at: new Date().toISOString() }
      ] as unknown as T;
    }

    if (path.startsWith('/connectors/') && path.endsWith('/connect') && options.method === 'POST') {
      const provider = path.split('/')[2];
      return {
        redirect_url: 'https://composio.dev/mock-oauth-redirect',
        connection_id: `${provider}-mock-id`,
        status: 'initiated'
      } as unknown as T;
    }

    if (path.startsWith('/connectors/') && options.method === 'DELETE') {
      return {} as unknown as T;
    }

    if (path.startsWith('/connectors/')) {
      const connectionId = path.split('/')[2];
      const provider = connectionId.split('-')[0] || 'trello';
      return {
        id: connectionId,
        provider: provider as 'trello' | 'notion' | 'github',
        status: 'active',
        connected_at: new Date().toISOString(),
        created_at: new Date().toISOString()
      } as unknown as T;
    }

    if (path === '/planning-jobs' && options.method === 'POST') {
      mockJobStatus = 'pending';
      if (mockJobTimeout1) window.clearTimeout(mockJobTimeout1);
      if (mockJobTimeout2) window.clearTimeout(mockJobTimeout2);
      
      mockJobTimeout1 = window.setTimeout(() => {
        mockJobStatus = 'running';
        mockJobTimeout2 = window.setTimeout(() => {
          mockJobStatus = 'completed';
        }, 4000);
      }, 3000);

      return {
        job_id: 'mock-job-id',
        status: 'pending',
        prompt: 'Mock prompt',
        connectors: [],
        result: null,
        error_code: null,
        error_message: null,
        created_at: new Date().toISOString(),
        started_at: null,
        finished_at: null
      } as unknown as T;
    }

    if (path.startsWith('/planning-jobs/')) {
      const jobId = path.split('/')[2];
      const isCompleted = mockJobStatus === 'completed';
      return {
        job_id: jobId,
        status: mockJobStatus,
        prompt: 'Mock prompt',
        connectors: [],
        result: isCompleted ? {
          suggestions: [
            "Reformulation : 'Le flux de travail académique moderne bénéficie grandement de la cartographie des connaissances en réseau.'",
            "Référence trouvée : Kahneman, D. (2011) 'Thinking, Fast and Slow'.",
            "Suggestion : Essayer d'utiliser le Mode Focus pour rédiger la section suivante."
          ]
        } : null,
        error_code: null,
        error_message: null,
        created_at: new Date().toISOString(),
        started_at: mockJobStatus !== 'pending' ? new Date().toISOString() : null,
        finished_at: isCompleted ? new Date().toISOString() : null
      } as unknown as T;
    }

    if (path === '/templates') {
      return [
        {
          id: 'mock-master-2',
          title: 'Mémoire Master 2',
          doc_type: 'thesis',
          scope: 'public',
          sections: [{ id: 's1', title: 'Introduction' }, { id: 's2', title: 'Cadre théorique' }]
        },
        {
          id: 'mock-rapport-stage',
          title: 'Rapport de Stage',
          doc_type: 'report',
          scope: 'public',
          sections: [{ id: 's3', title: 'Présentation' }]
        },
        {
          id: 'mock-these-doctorat',
          title: 'Thèse de Doctorat',
          doc_type: 'thesis',
          scope: 'public',
          sections: [{ id: 's4', title: 'Introduction' }, { id: 's5', title: 'Revue de Littérature' }]
        }
      ] as unknown as T;
    }

    if (path.startsWith('/templates/') && path.endsWith('/apply') && options.method === 'POST') {
      const body = JSON.parse(options.body as string);
      const docId = body.documentId;
      mockSections[docId] = [
        {
          id: `mock-sec-${Date.now()}-1`,
          document_id: docId,
          title: 'Introduction & Problématique',
          content: 'Commencez à rédiger ici...',
          order: 0,
          status: 'draft',
          word_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: `mock-sec-${Date.now()}-2`,
          document_id: docId,
          title: 'Cadre Méthodologique',
          content: 'Décrivez vos outils et concepts...',
          order: 1,
          status: 'draft',
          word_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      return { sections_created: 2 } as unknown as T;
    }

    if (path === '/gamification/me') {
      return {
        xp: 12500,
        level: 25,
        milestones: [],
        today_missions: []
      } as unknown as T;
    }

    if (path === '/gamification/leaderboard') {
      return [
        { user_id: 'mock-admin-uuid', display_name: 'Administrateur', xp: 12500, level: 25 },
        { user_id: 'user-2', display_name: 'Alexandre R.', xp: 11920, level: 24 },
        { user_id: 'user-3', display_name: 'Sarah Chen', xp: 10500, level: 21 },
        { user_id: 'user-4', display_name: 'Thomas V.', xp: 9840, level: 19 }
      ] as unknown as T;
    }

    if (path === '/documents') {
      if (options.method === 'POST') {
        const body = JSON.parse(options.body as string);
        const newDoc = {
          id: `mock-doc-${Date.now()}`,
          user_id: 'mock-admin-uuid',
          title: body.title || 'Document sans titre',
          doc_type: body.docType || 'thesis',
          status: 'draft',
          style_config: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        mockDocuments.push(newDoc);
        mockSections[newDoc.id] = [];
        return newDoc as unknown as T;
      }
      return mockDocuments as unknown as T;
    }

    if (path.startsWith('/documents/') && !path.includes('/sections') && options.method === 'PATCH') {
      const docId = path.split('/')[2];
      const body = JSON.parse(options.body as string);
      mockDocuments = mockDocuments.map(d => d.id === docId ? { ...d, ...body } : d);
      return mockDocuments.find(d => d.id === docId) as unknown as T;
    }

    if (path.startsWith('/documents/') && path.endsWith('/sections')) {
      const docId = path.split('/')[2];
      if (options.method === 'POST') {
        const body = JSON.parse(options.body as string);
        const newSec = {
          id: `mock-sec-${Date.now()}`,
          document_id: docId,
          title: body.title || 'Nouvelle section',
          content: body.content || '',
          order: mockSections[docId] ? mockSections[docId].length : 0,
          status: 'draft',
          word_count: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        if (!mockSections[docId]) mockSections[docId] = [];
        mockSections[docId].push(newSec);
        return newSec as unknown as T;
      }
      return (mockSections[docId] || []) as unknown as T;
    }

    if (path.startsWith('/documents/') && path.includes('/sections/')) {
      const parts = path.split('/');
      const docId = parts[2];
      const secId = parts[4];
      if (options.method === 'PATCH') {
        const body = JSON.parse(options.body as string);
        if (mockSections[docId]) {
          mockSections[docId] = mockSections[docId].map(s => s.id === secId ? { ...s, ...body } : s);
          return mockSections[docId].find(s => s.id === secId) as unknown as T;
        }
      }
      if (options.method === 'DELETE') {
        if (mockSections[docId]) {
          mockSections[docId] = mockSections[docId].filter(s => s.id !== secId);
        }
        return {} as unknown as T;
      }
    }
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

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return {} as T;
  }

  if (!response.ok) {
    let errorData: Record<string, unknown>;
    try {
      const json = await response.json();
      errorData = typeof json === 'object' && json !== null ? (json as Record<string, unknown>) : {};
    } catch {
      // Non-JSON error
      throw new ApiError(response.statusText, response.status, 'HttpError');
    }

    // Check for standard NestJS / MemoFlow error shape
    const message = errorData.message;
    const errMsg = message
      ? Array.isArray(message)
        ? message.join(', ')
        : String(message)
      : response.statusText;

    // Handle token expiration / auth failure
    if (response.status === 401) {
      clearToken();
    }

    throw new ApiError(
      errMsg,
      typeof errorData.statusCode === 'number' ? errorData.statusCode : response.status,
      typeof errorData.error === 'string' ? errorData.error : 'ApiError',
      typeof errorData.path === 'string' ? errorData.path : undefined
    );
  }

  return response.json() as Promise<T>;
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
