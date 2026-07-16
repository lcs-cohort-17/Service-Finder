import { useCallback, useState } from 'react';
import type { Service } from '../types/service';
import { getServiceById, normalizeService } from '../utils/serviceDataset';

export interface UseSelectedServiceResult {
  /** Full service data for the currently clicked marker, or null when none is selected. */
  selectedService: Service | null;
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
 * storing it in state, and clearing the selection when the panel is
 * dismissed. Directions/locate actions live in useMapActions, which acts
 * directly on our own Leaflet map instead of generating external URLs.
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

  return {
    selectedService,
    isServiceSelected: selectedService !== null,
    selectService,
    selectServiceFromDataset,
    clearSelectedService,
  };
}
