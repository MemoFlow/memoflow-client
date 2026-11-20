import type { PostHog } from 'posthog-js';

/**
 * PostHog for the React app (the blog has its own snippet: blog/src/components/posthog.astro).
 * Same project and same variables as the blog (vite.config envPrefix includes PUBLIC_), and the
 * same origin in production, so a visitor keeps one anonymous id between the blog and the app.
 *
 * Only started after analytics consent (see analytics.ts); the SDK is downloaded at that moment.
 *
 * Privacy:
 * - identify() sends the account id and role only: never the email or the name;
 * - session replay masks every input and does not record elements with the
 *   `ph-no-capture` class (documents, generated plans, admin data, profile, leaderboard).
 *   Add that class to any new area that shows a user's content or personal data.
 */

const TOKEN: string | undefined = import.meta.env.PUBLIC_POSTHOG_PROJECT_TOKEN;
const HOST: string | undefined = import.meta.env.PUBLIC_POSTHOG_HOST;

let client: PostHog | null = null;
// Consent state as seen by this page (the SDK may still be downloading)
let wanted = false;
let loading: Promise<PostHog | null> | null = null;
// Calls made while the SDK is downloading
const queue: ((ph: PostHog) => void)[] = [];

function withClient(fn: (ph: PostHog) => void): void {
  if (!wanted) return;
  if (client) fn(client);
  else if (loading) queue.push(fn);
}

/** Starts PostHog (consent granted). Calling it again after a withdrawal opts back in. */
export function startPostHog(): void {
  wanted = true;
  if (client) {
    client.set_config({ opt_out_capturing_by_default: false });
    client.opt_in_capturing();
    client.startSessionRecording();
    return;
  }
  if (loading) return;
  if (!TOKEN || !HOST) {
    if (import.meta.env.DEV) console.warn('PostHog: PUBLIC_POSTHOG_PROJECT_TOKEN or PUBLIC_POSTHOG_HOST is missing');
    return;
  }
  loading = import('posthog-js')
    .then(({ default: posthog }) => {
      loading = null;
      if (!wanted) return null; // consent withdrawn while downloading
      posthog.init(TOKEN, {
        api_host: HOST,
        person_profiles: 'identified_only',
        capture_pageview: 'history_change',
        capture_pageleave: true,
        session_recording: { maskAllInputs: true },
        capture_exceptions: {
          capture_unhandled_errors: true,
          capture_unhandled_rejections: true,
          capture_console_errors: false,
        },
      });
      client = posthog;
      queue.splice(0).forEach((fn) => fn(posthog));
      return posthog;
    })
    .catch((err) => {
      console.warn('PostHog could not be loaded:', err);
      loading = null;
      return null;
    });
}

/**
 * Consent withdrawn: stops capture and session recording for this page. Opted out "by default"
 * as well, because analytics.ts then deletes PostHog's storage, opt-out marker included.
 */
export function stopPostHog(): void {
  wanted = false;
  queue.length = 0;
  if (!client) return;
  client.stopSessionRecording();
  client.opt_out_capturing();
  client.set_config({ opt_out_capturing_by_default: true });
}

export function capturePostHogEvent(event: string, properties: Record<string, unknown> = {}): void {
  withClient((ph) => ph.capture(event, properties));
}

/** Links the anonymous visitor to the account: id and role only */
export function identifyPostHogUser(user: { id: string; role: string }): void {
  withClient((ph) => {
    if (ph.get_distinct_id() !== user.id) ph.identify(user.id, { role: user.role });
  });
}

/** Logout: the next actions are anonymous again */
export function resetPostHogUser(): void {
  withClient((ph) => ph.reset());
}
