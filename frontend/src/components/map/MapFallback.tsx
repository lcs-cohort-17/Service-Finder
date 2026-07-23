import type { ReactNode } from "react";

export interface MapFallbackService {
  id: string;
  name: string;
  category?: string;
  address?: string;
}

interface MapFallbackProps {
  /** Short, non-technical message describing what went wrong. */
  message: string;
  /** Called when the user clicks "Try again". */
  onRetry: () => void;
  /** How many times retry has already been pressed. */
  retryCount: number;
  /** Retry button is disabled once this is reached. */
  maxRetries: number;
  /**
   * Optional list of services to render so the user isn't stuck with
   * nothing — the map fails, but they can still find a service.
   */
  services?: MapFallbackService[];
  /** Optional extra content, e.g. a "contact support" link. */
  children?: ReactNode;
}

/**
 * Fallback UI for MapErrorBoundary. Never renders a blank screen:
 * always shows a clear message, a retry action, and — when available —
 * a plain list of services so the user can keep going without the map.
 */
export default function MapFallback({
  message,
  onRetry,
  retryCount,
  maxRetries,
  services = [],
  children,
}: MapFallbackProps) {
  const retryExhausted = retryCount >= maxRetries;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex min-h-[320px] w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m0 3.75h.008v.008H12v-.008ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">
        Map unavailable
      </h3>
      <p className="mt-2 max-w-sm text-sm text-slate-600">{message}</p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          disabled={retryExhausted}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {retryExhausted ? "Still unavailable" : "Try again"}
        </button>
        {retryExhausted && (
          <span className="text-xs text-slate-500">
            We've retried a few times — please refresh the page or come back
            later.
          </span>
        )}
      </div>

      {services.length > 0 && (
        <div className="mt-8 w-full max-w-md text-left">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Nearby services (list view)
          </p>
          <ul className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
            {services.map((service) => (
              <li key={service.id} className="p-3">
                <p className="text-sm font-medium text-slate-900">
                  {service.name}
                </p>
                {(service.category || service.address) && (
                  <p className="mt-0.5 text-xs text-slate-500">
                    {[service.category, service.address]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {children}
    </div>
  );
}