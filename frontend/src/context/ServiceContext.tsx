import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MOCK_SERVICES } from "../data/mockServices";
import type { Service, SelectedServiceData } from "../types/service.types";
import {
  generateDirectionsUrl,
  generateStreetViewUrl,
} from "../utils/urlGenerators";

interface ServiceContextValue {
  /** The full service dataset (later swapped for a live API/Firestore fetch). */
  services: Service[];
  /** The service tied to whichever marker was last clicked, or null. */
  selectedService: Service | null;
  /** Derived navigation links for the selected service, or null. */
  selectedServiceData: SelectedServiceData | null;
  /**
   * Ticket: SF-102 - Retrieve and prepare service data on marker click.
   * Looks the service up by id, stores it in state, and generates the
   * Directions/Street View URLs the details panel needs.
   */
  selectService: (serviceId: string) => void;
  /** Clears the selected service data from state, e.g. when the panel is dismissed. */
  clearSelectedService: () => void;
}

const ServiceContext = createContext<ServiceContextValue | undefined>(
  undefined,
);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [services] = useState<Service[]>(MOCK_SERVICES);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );

  const selectService = useCallback((serviceId: string) => {
    setSelectedServiceId(serviceId);
  }, []);

  const clearSelectedService = useCallback(() => {
    setSelectedServiceId(null);
  }, []);

  const selectedService = useMemo(() => {
    if (!selectedServiceId) return null;
    return services.find((service) => service.id === selectedServiceId) ?? null;
  }, [services, selectedServiceId]);

  const selectedServiceData = useMemo<SelectedServiceData | null>(() => {
    if (!selectedService) return null;
    return {
      service: selectedService,
      directionsUrl: generateDirectionsUrl(
        selectedService.lat,
        selectedService.lng,
      ),
      streetViewUrl: generateStreetViewUrl(
        selectedService.lat,
        selectedService.lng,
      ),
    };
  }, [selectedService]);

  const value = useMemo<ServiceContextValue>(
    () => ({
      services,
      selectedService,
      selectedServiceData,
      selectService,
      clearSelectedService,
    }),
    [
      services,
      selectedService,
      selectedServiceData,
      selectService,
      clearSelectedService,
    ],
  );

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServiceContext(): ServiceContextValue {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
}
