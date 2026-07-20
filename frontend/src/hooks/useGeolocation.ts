// frontend/src/hooks/useGeolocation.ts
import { useState, useCallback, useEffect, useRef } from "react";
import type { Coordinates, GeolocationPermissionState } from "../types/directions.types";

interface UseGeolocationResult {
  coordinates: Coordinates | null;
  permissionState: GeolocationPermissionState;
  loading: boolean;
  error: string | null;
  getCurrentLocation: () => void;
  clearLocation: () => void;
}

// Friendly messages for the standard Geolocation error codes
function getErrorMessage(error: GeolocationPositionError): string {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Location access was denied. You can enable it in your browser settings or enter your location manually.";
    case error.POSITION_UNAVAILABLE:
      return "Your location could not be determined. Please check your device's location services.";
    case error.TIMEOUT:
      return "Getting your location took too long. Please try again.";
    default:
      return "Something went wrong while getting your location.";
  }
}

export function useGeolocation(): UseGeolocationResult {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [permissionState, setPermissionState] = useState<GeolocationPermissionState>("unknown");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const permissionStatusRef = useRef<PermissionStatus | null>(null);

  // Checks current permission state without triggering a prompt, and keeps
  // it in sync if the user changes permission via browser UI. Not all
  // browsers support the Permissions API, so this fails gracefully.
  useEffect(() => {
    if (!navigator.permissions) {
      setPermissionState("unknown");
      return;
    }

    let isMounted = true;

    navigator.permissions
      .query({ name: "geolocation" as PermissionName })
      .then((result) => {
        if (!isMounted) return;
        setPermissionState(result.state as GeolocationPermissionState);
        permissionStatusRef.current = result;
        result.onchange = () => {
          setPermissionState(result.state as GeolocationPermissionState);
        };
      })
      .catch(() => {
        if (isMounted) setPermissionState("unknown");
      });

    return () => {
      isMounted = false;
      if (permissionStatusRef.current) {
        permissionStatusRef.current.onchange = null;
      }
    };
  }, []);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setPermissionState("granted");
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(getErrorMessage(err));
        setPermissionState(err.code === err.PERMISSION_DENIED ? "denied" : "prompt");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const clearLocation = useCallback(() => {
    setCoordinates(null);
    setError(null);
  }, []);

  return { coordinates, permissionState, loading, error, getCurrentLocation, clearLocation };
}