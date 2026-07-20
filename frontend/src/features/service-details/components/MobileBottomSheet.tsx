import { getCategoryConfig } from "../../../components/markers/categoryConfig";
import { Button } from "../../../components/ui/Button";
import { useServiceDetails } from "../hooks/useServiceDetails";

/**
 * Bottom-sheet variant of the details panel for narrow (mobile) screens.
 * Mirrors DesktopPopup's data but with a layout suited to small widths.
 */
export function MobileBottomSheet() {
  const { service, directionsUrl, streetViewUrl, isOpen, dismiss } =
    useServiceDetails();

  if (!isOpen || !service) return null;

  const category = getCategoryConfig(service.type);

  return (
    <div className="absolute inset-x-0 bottom-0 z-[500] md:hidden">
      <div className="mx-auto max-w-xl rounded-t-2xl border-t border-slate-200 bg-white p-4 shadow-2xl">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200" />

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

        <h2 className="mt-2 text-base font-semibold text-slate-900">
          {service.name}
        </h2>
        <p className="mt-1 text-sm text-slate-600">{service.address}</p>
        <p className="mt-1 text-sm text-slate-500">
          {service.phone} &middot; {service.hours}
        </p>

        <div className="mt-4 flex gap-2">
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
