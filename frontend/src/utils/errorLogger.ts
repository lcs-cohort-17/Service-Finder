/**
 * errorLogger.ts
 *
 * Small abstraction around error reporting so components don't call a
 * specific vendor SDK directly. Swap the body of `sendToMonitoringService`
 * for Sentry / LogRocket / Datadog / your backend `/api/logs` endpoint
 * when one is wired up — nothing else in the app needs to change.
 */

export interface ErrorContext {
  /** Where the error happened, e.g. "map", "directions", "search" */
  boundary: string;
  /** Which retry attempt this was (0 = first failure) */
  retryCount?: number;
  /** Anything else useful for debugging (route, query params, etc.) */
  extra?: Record<string, unknown>;
}

export interface LoggedError {
  message: string;
  stack?: string;
  componentStack?: string | null;
  boundary: string;
  retryCount: number;
  timestamp: string;
  url: string;
}

/**
 * Central place that decides what "logging an error" means.
 * Today: console + an in-memory buffer (handy for the fallback UI / tests).
 * Tomorrow: point this at a real monitoring service.
 */
function sendToMonitoringService(payload: LoggedError): void {
  // TODO: replace with real monitoring integration, e.g.
  //   Sentry.captureException(new Error(payload.message), { extra: payload });
  // or
  //   fetch("/api/logs", { method: "POST", body: JSON.stringify(payload) });
  // eslint-disable-next-line no-console
  console.error("[monitoring]", payload);
}

const recentErrors: LoggedError[] = [];

export function logError(
  error: Error,
  componentStack: string | null | undefined,
  context: ErrorContext,
): LoggedError {
  const payload: LoggedError = {
    message: error.message,
    stack: error.stack,
    componentStack,
    boundary: context.boundary,
    retryCount: context.retryCount ?? 0,
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : "",
  };

  recentErrors.push(payload);
  sendToMonitoringService(payload);

  return payload;
}

/** Useful for debugging / tests: last errors captured in this session. */
export function getRecentErrors(): ReadonlyArray<LoggedError> {
  return recentErrors;
}

/**
 * Turns a raw error into a short, non-technical message safe to show a user.
 * Keeps the actual error (with stack) for the logs, not the screen.
 */
export function toUserFacingMessage(error: Error): string {
  const message = error.message?.toLowerCase() ?? "";

  if (message.includes("network") || message.includes("fetch")) {
    return "We couldn't reach the map service. Check your connection and try again.";
  }

  if (message.includes("timeout")) {
    return "The map took too long to respond. Please try again.";
  }

  return "Something went wrong loading the map.";
}