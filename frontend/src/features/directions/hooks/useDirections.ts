import { useState, useCallback, useRef } from "react";
import { getRoute as getRouteFromService } from "../services/routeService";
import type {
  Coordinates,
  TransportMode,
  RouteResult,
} from "../../../types/directions.types";

/* ========= Directions-005 ========= */
import { useRouteStore } from "../../../store/useRouteStore";
/* ================================== */

interface LastRequest {
  origin: Coordinates;
  destination: Coordinates;
  mode: TransportMode;
}

interface UseDirectionsResult {
  route: RouteResult | null;
  loading: boolean;
  error: string | null;
  getRoute: (
    origin: Coordinates,
    destination: Coordinates,
    mode: TransportMode
  ) => Promise<void>;
  retry: () => void;
  clearRoute: () => void;
}

export function useDirections(): UseDirectionsResult {
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastRequestRef = useRef<LastRequest | null>(null);

  const getRoute = useCallback(
    async (
      origin: Coordinates,
      destination: Coordinates,
      mode: TransportMode
    ) => {
      lastRequestRef.current = {
        origin,
        destination,
        mode,
      };

      setLoading(true);
      setError(null);

      const result = await getRouteFromService(
        origin,
        destination,
        mode
      );

      if (result.success === false) {
        setError(result.error);
        setRoute(null);
        setLoading(false);
        return;
      }

      setRoute(result.route);

      /* ========= Directions-005 ========= */

      const navigation = useRouteStore.getState();

      navigation.setOrigin(
        `${origin.lat}, ${origin.lng}`
      );

      navigation.setDestination(
        `${destination.lat}, ${destination.lng}`
      );

      navigation.setRouteCoordinates(
        result.route.polyline
      );

      navigation.setInstructions(
        result.route.instructions.map(
          (step) => step.instruction
        )
      );

      navigation.setDistance(
        `${(result.route.distance / 1000).toFixed(1)} km`
      );

      navigation.setEta(
        `${Math.round(result.route.duration / 60)} min`
      );

      /* ================================== */

      setError(null);
      setLoading(false);
    },
    []
  );

  const retry = useCallback(() => {
    const last = lastRequestRef.current;

    if (!last) return;

    getRoute(
      last.origin,
      last.destination,
      last.mode
    );
  }, [getRoute]);

  const clearRoute = useCallback(() => {
    setRoute(null);
    setError(null);
    lastRequestRef.current = null;

    /* ========= Directions-005 ========= */

    useRouteStore
      .getState()
      .resetNavigation();

    /* ================================== */

  }, []);

  return {
    route,
    loading,
    error,
    getRoute,
    retry,
    clearRoute,
  };
}