import { apiFetch } from './api';

/**
 * Password reset and email verification ("Password Reset and Email Verification:
 * Frontend Contract", PR #64).
 *
 * Email links: <APP_BASE_URL>/reset-password#token=…  and  <APP_BASE_URL>/verify-email#token=…
 */

// ─── Token from the email link ───────────────────────────────────────────────
// Read once per page load, then removed from the address bar and history. Kept in
// memory only (never storage, logs or analytics). Cached by path so React StrictMode,
// which runs state initialisers twice, still gets the token on the second call.
const capturedTokens = new Map<string, string | null>();

export function takeTokenFromUrl(): string | null {
  const key = window.location.pathname;
  if (capturedTokens.has(key)) return capturedTokens.get(key) ?? null;
  const token = new URLSearchParams(window.location.hash.slice(1)).get('token');
  window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
  capturedTokens.set(key, token || null);
  return token || null;
}

// ─── API calls ───────────────────────────────────────────────────────────────
export function requestPasswordReset(email: string): Promise<{ message: string }> {
  return apiFetch('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email: email.trim() }),
  });
}

/** Passwords are never trimmed. 204 on success. */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await apiFetch('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, new_password: newPassword }),
  });
}

/** 204 on success. A token works once: call it a single time per link. */
export async function verifyEmail(token: string): Promise<void> {
  await apiFetch('/auth/verify-email', {
    method: 'POST',
    body: JSON.stringify({ token }),
  });
}

// ─── Resend with cooldown ────────────────────────────────────────────────────
// The API sends nothing if a verification email went out in the last 5 minutes,
// including the one sent at registration, and does not say how long is left.
export const RESEND_COOLDOWN_MS = 5 * 60 * 1000;

const sentAtKey = (email: string) => `memoflow_verification_sent_at_${email.trim().toLowerCase()}`;

export function markVerificationEmailSent(email: string): void {
  localStorage.setItem(sentAtKey(email), String(Date.now()));
}

/** Timestamp (ms) from which a resend can actually send something */
export function getResendAvailableAt(email: string): number {
  const sentAt = Number(localStorage.getItem(sentAtKey(email)));
  return Number.isFinite(sentAt) && sentAt > 0 ? sentAt + RESEND_COOLDOWN_MS : 0;
}

/** Requires a session. Starts the cooldown whatever the API decided to do. */
export async function resendVerificationEmail(email: string): Promise<void> {
  await apiFetch('/auth/resend-verification', { method: 'POST' });
  markVerificationEmailSent(email);
}
