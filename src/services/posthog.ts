import posthog from 'posthog-js';

const projectToken = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;
const host = import.meta.env.VITE_POSTHOG_HOST;

let initialized = false;

type PostHogLogAttributes = Record<string, string | number | boolean>;

/** Logs only purpose-built records from this app through PostHog's native browser logger. */
export const posthogLogs = {
  info(message: string, attributes: PostHogLogAttributes = {}): void {
    if (initialized) posthog.logger.info(message, attributes);
  },
  warn(message: string, attributes: PostHogLogAttributes = {}): void {
    if (initialized) posthog.logger.warn(message, attributes);
  },
};

/** Initializes the shared browser client once analytics consent has been granted. */
export function initPostHog(): void {
  if (initialized) return;

  if (!projectToken) {
    if (import.meta.env.DEV) {
      console.error(
        'VITE_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_PROJECT_TOKEN is configured'
      );
    }
    return;
  }

  if (!host) {
    if (import.meta.env.DEV) {
      console.error(
        'VITE_POSTHOG_HOST variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once VITE_POSTHOG_HOST is configured'
      );
    }
    return;
  }

  posthog.init(projectToken, {
    api_host: host,
    capture_pageview: 'history_change',
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
    logs: {
      serviceName: 'memoflow-client',
      environment: import.meta.env.PROD ? 'production' : 'development',
    },
  });
  posthog.opt_in_capturing();
  initialized = true;
  posthogLogs.info('analytics client initialized', {
    event: 'analytics_client',
    outcome: 'initialized',
  });
}

export function capturePostHogEvent(event: string, properties: Record<string, unknown> = {}): void {
  if (initialized) posthog.capture(event, properties);
}

export function optOutPostHog(): void {
  if (initialized) posthog.opt_out_capturing();
}

/** Identifies the authenticated person after consent and PostHog initialization. */
export function identifyPostHogUser(user: { id: string; email: string; display_name: string; role: string }): void {
  if (!initialized) return;

  posthog.identify(user.id, {
    email: user.email,
    name: user.display_name,
    role: user.role,
  });
}

/** Clears the persisted identity when the authenticated session ends. */
export function resetPostHogUser(): void {
  if (initialized) posthog.reset();
}
