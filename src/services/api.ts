import { io, Socket } from 'socket.io-client';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

// Token helper functions
export function getToken(): string | null {
  return localStorage.getItem('memoflow_token');
}

export function setToken(token: string): void {
  localStorage.setItem('memoflow_token', token);
}

export function clearToken(): void {
  localStorage.removeItem('memoflow_token');
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

// Main fetch wrapper
export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const token = getToken();

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

  socketInstance.on('planning.status', (data) => {
    console.log('Socket event planning.status:', data);
    if (callbacks.onStatus) callbacks.onStatus(data);
  });

  socketInstance.on('planning.completed', (data) => {
    console.log('Socket event planning.completed:', data);
    if (callbacks.onCompleted) callbacks.onCompleted(data);
  });

  socketInstance.on('planning.failed', (data) => {
    console.log('Socket event planning.failed:', data);
    if (callbacks.onFailed) callbacks.onFailed(data);
  });

  socketInstance.on('planning.error', (data) => {
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
