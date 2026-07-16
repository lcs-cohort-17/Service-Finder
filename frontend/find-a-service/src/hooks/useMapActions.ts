import { useCallback, useRef, useState } from 'react';
import L, { type LatLngExpression, type Map as LeafletMap } from 'leaflet';
import type { Service } from '../types/service';
import { fetchRoute } from '../utils/routing';
import { getUserLocation } from '../utils/mapHelpers';

export interface RouteSummary {
  distanceKm: number;
  durationMin: number;
}

export interface UseMapActionsResult {
  /** Pass to <Map onReady={handleMapReady} />. */
  handleMapReady: (map: LeafletMap) => void;
  route: LatLngExpression[] | null;
  userLocation: LatLngExpression | null;
  /** Id of the service whose marker/popup should be highlighted on the map. */
  focusedServiceId: string | null;
  isRouting: boolean;
  routeError: string | null;
  routeSummary: RouteSummary | null;
  /** Fetches a real route from the user's location to the service and draws it on our own map. */
  showDirectionsTo: (service: Service) => Promise<void>;
  /** Centers/zooms the map on the service and opens its popup, without leaving the app. */
  locateService: (service: Service) => void;
  clearRoute: () => void;
}

/**
 * Replaces the old "open Google Maps in a new tab" behavior: routes and
 * marker focus are computed here and rendered directly on our own Leaflet
 * map via <Map route={...} userLocation={...} focusedMarkerId={...} />.
 */
export function useMapActions(): UseMapActionsResult {
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  const [route, setRoute] = useState<LatLngExpression[] | null>(null);
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);
  const [focusedServiceId, setFocusedServiceId] = useState<string | null>(null);
  const [isRouting, setIsRouting] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [routeSummary, setRouteSummary] = useState<RouteSummary | null>(null);

  const handleMapReady = useCallback((map: LeafletMap) => {
    mapInstanceRef.current = map;
  }, []);

  const showDirectionsTo = useCallback(async (service: Service) => {
    setIsRouting(true);
    setRouteError(null);

    try {
      const position = await getUserLocation();
      const origin = { lat: position.coords.latitude, lng: position.coords.longitude };
      const destination = { lat: service.lat, lng: service.lng };

      setUserLocation([origin.lat, origin.lng]);

      const result = await fetchRoute(origin, destination, 'driving');

      setRoute(result.coordinates);
      setRouteSummary({
        distanceKm: Math.round((result.distanceMeters / 1000) * 10) / 10,
        durationMin: Math.max(1, Math.round(result.durationSeconds / 60)),
      });
      setFocusedServiceId(service.id);

      const map = mapInstanceRef.current;
      if (map && result.coordinates.length > 0) {
        map.fitBounds(L.latLngBounds(result.coordinates), { padding: [48, 48] });
      }
    } catch (error) {
      setRoute(null);
      setRouteSummary(null);
      setRouteError(
        error instanceof Error ? error.message : 'Could not calculate directions. Please try again.'
      );
    } finally {
      setIsRouting(false);
    }
  }, []);

  const locateService = useCallback((service: Service) => {
    setRouteError(null);
    setFocusedServiceId(service.id);

    const map = mapInstanceRef.current;
    if (map) {
      map.setView([service.lat, service.lng], Math.max(map.getZoom(), 16), { animate: true });
    }
  }, []);

  const clearRoute = useCallback(() => {
    setRoute(null);
    setRouteSummary(null);
    setRouteError(null);
  }, []);

  return {
    handleMapReady,
    route,
    userLocation,
    focusedServiceId,
    isRouting,
    routeError,
    routeSummary,
    showDirectionsTo,
    locateService,
    clearRoute,
  };
}
