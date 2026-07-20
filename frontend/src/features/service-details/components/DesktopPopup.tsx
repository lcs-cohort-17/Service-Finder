import { getCategoryConfig } from "../../../components/markers/categoryConfig";
import { Button } from "../../../components/ui/Button";
import { useServiceDetails } from "../hooks/useServiceDetails";

/**
 * Floating details panel shown over the map (desktop / tablet widths)
 * once a marker has been clicked. Hidden on narrow screens in favour of
 * MobileBottomSheet.
 */
export function DesktopPopup() {
  const { service, directionsUrl, streetViewUrl, isOpen, dismiss } =
    useServiceDetails();

  if (!isOpen || !service) return null;

  const category = getCategoryConfig(service.type);

  return (
    <div className="pointer-events-none absolute inset-0 z-[500] hidden md:block">
      <div className="pointer-events-auto absolute right-4 top-4 w-80 rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: category.color }}
              aria-hidden="true"
            />
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {category.label}
            </span>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close details"
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <h2 className="mt-2 text-lg font-semibold text-slate-900">
          {service.name}
        </h2>
        <p className="mt-1 text-sm text-slate-600">{service.address}</p>

        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Phone</dt>
            <dd className="text-right font-medium text-slate-900">
              {service.phone}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Hours</dt>
            <dd className="text-right font-medium text-slate-900">
              {service.hours}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate-500">Website</dt>
            <dd className="truncate text-right font-medium text-blue-600">
              <a
                href={service.website}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Visit site
              </a>
            </dd>
          </div>
        </dl>

        <div className="mt-5 flex gap-2">
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => window.open(directionsUrl ?? "#", "_blank")}
          >
            Directions
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => window.open(streetViewUrl ?? "#", "_blank")}
          >
            Street View
          </Button>
        </div>
      </div>
    </div>
  );
}
