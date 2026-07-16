import { useCallback, useMemo, useState } from 'react';
import type { Service } from '../types/service';
import { getServiceById, normalizeService } from '../utils/serviceDataset';
import { getDirectionsUrl, getStreetViewUrl } from '../utils/navigation';

export interface NavigationUrls {
  directionsUrl: string;
  streetViewUrl: string;
}

export interface UseSelectedServiceResult {
  /** Full service data for the currently clicked marker, or null when none is selected. */
  selectedService: Service | null;
  /** Directions / Street View URLs derived from the selected service's coordinates. */
  navigationUrls: NavigationUrls | null;
  /** Convenience flag for UI components deciding whether to render the details panel. */
  isServiceSelected: boolean;
  /** Store a full service object directly (e.g. marker already carries full data). */
  selectService: (service: Service) => void;
  /** Look up a service by id in the provided dataset and store the full record. */
  selectServiceFromDataset: (serviceId: string, services: Service[]) => void;
  /** Clear the selected service (e.g. when the details panel is dismissed). */
  clearSelectedService: () => void;
}

/**
 * Manages the "selected service" state for the map details panel.
 *
 * Handles: capturing a marker click, retrieving the full service record,
 * storing it in state, deriving Directions/Street View URLs, and clearing
 * the selection when the panel is dismissed.
 */
export function useSelectedService(): UseSelectedServiceResult {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const selectService = useCallback((service: Service) => {
    if (!service?.id) return;
    setSelectedService(normalizeService(service));
  }, []);

  const selectServiceFromDataset = useCallback((serviceId: string, services: Service[]) => {
    setSelectedService(getServiceById(services, serviceId));
  }, []);

  const clearSelectedService = useCallback(() => {
    setSelectedService(null);
  }, []);

  const navigationUrls = useMemo<NavigationUrls | null>(() => {
    if (!selectedService) return null;
    return {
      directionsUrl: getDirectionsUrl(selectedService.lat, selectedService.lng),
      streetViewUrl: getStreetViewUrl(selectedService.lat, selectedService.lng),
    };
  }, [selectedService]);

  return {
    selectedService,
    navigationUrls,
    isServiceSelected: selectedService !== null,
    selectService,
    selectServiceFromDataset,
    clearSelectedService,
  };
}
