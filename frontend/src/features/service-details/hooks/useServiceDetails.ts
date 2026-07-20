import { useServiceContext } from "../../../context/ServiceContext";
import type { Service } from "../../../types/service.types";

interface UseServiceDetailsResult {
  /** The service belonging to whichever marker was last clicked. Null when nothing is selected. */
  service: Service | null;
  /** Google Maps Directions URL for the selected service. Null when nothing is selected. */
  directionsUrl: string | null;
  /** Google Maps Street View URL for the selected service. Null when nothing is selected. */
  streetViewUrl: string | null;
  /** Whether a service is currently selected, i.e. whether the details panel should render. */
  isOpen: boolean;
  /** Dismiss the details panel and clear the selected service from state. */
  dismiss: () => void;
}

/**
 * Consumption point for the "marker click -> service details" ticket.
 * MapMarkers calls `selectService(id)` from ServiceContext directly on
 * click; this hook is what the details panel components use to read
 * that selection and the URLs generated from it.
 */
export function useServiceDetails(): UseServiceDetailsResult {
  const { selectedServiceData, clearSelectedService } = useServiceContext();

  return {
    service: selectedServiceData?.service ?? null,
    directionsUrl: selectedServiceData?.directionsUrl ?? null,
    streetViewUrl: selectedServiceData?.streetViewUrl ?? null,
    isOpen: selectedServiceData !== null,
    dismiss: clearSelectedService,
  };
}
