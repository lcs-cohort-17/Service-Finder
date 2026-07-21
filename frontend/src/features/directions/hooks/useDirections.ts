// frontend/src/features/directions/hooks/useDirections.ts
import { useState, useCallback, useRef } from "react";
import { getRoute as getRouteFromService } from "../services/routeService";
import type { Coordinates, TransportMode, RouteResult } from "../../../types/directions.types";

interface LastRequest {
  origin: Coordinates;
  destination: Coordinates;
  mode: TransportMode;
}

interface UseDirectionsResult {
  route: RouteResult | null;
  loading: boolean;
  error: string | null;
  getRoute: (origin: Coordinates, destination: Coordinates, mode: TransportMode) => Promise<void>;
  retry: () => void;
  clearRoute: () => void;
}

export function useDirections(): UseDirectionsResult {
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastRequestRef = useRef<LastRequest | null>(null);

  const getRoute = useCallback(
    async (origin: Coordinates, destination: Coordinates, mode: TransportMode) => {
      lastRequestRef.current = { origin, destination, mode };
      setLoading(true);
      setError(null);

      const result = await getRouteFromService(origin, destination, mode);

      if (result.success === false) {
        setError(result.error);
        setRoute(null);
        setLoading(false);
        return;
      }

      setRoute(result.route);
      setError(null);
      setLoading(false);
    },
    []
  );

  const retry = useCallback(() => {
    const last = lastRequestRef.current;
    if (!last) return;
    getRoute(last.origin, last.destination, last.mode);
  }, [getRoute]);

  const clearRoute = useCallback(() => {
    setRoute(null);
    setError(null);
    lastRequestRef.current = null;
  }, []);

  return { route, loading, error, getRoute, retry, clearRoute };
}
