// frontend/src/features/directions/components/DirectionsForm.tsx
import { useState } from "react";
import { useGeolocation } from "../../../hooks/useGeolocation";
import { useDirections } from "../hooks/useDirections";
import ModeSelector from "./ModeSelector";
import TurnByList from "./TurnByList";
import type { TransportMode } from "../../../types/directions.types";

function DirectionsForm() {
  const {
    coordinates: origin,
    permissionState,
    loading: locationLoading,
    error: locationError,
    getCurrentLocation,
  } = useGeolocation();

  const { route, loading: routeLoading, error: routeError, getRoute, retry } = useDirections();

  const [mode, setMode] = useState<TransportMode>("driving");
  const [destinationLat, setDestinationLat] = useState("");
  const [destinationLng, setDestinationLng] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!origin) return;

    const lat = parseFloat(destinationLat);
    const lng = parseFloat(destinationLng);
    if (Number.isNaN(lat) || Number.isNaN(lng)) return;

    getRoute(origin, { lat, lng }, mode);
  };

  return (
    <div className="directions-form">
      <div className="directions-origin">
        <button type="button" onClick={getCurrentLocation} disabled={locationLoading}>
          {locationLoading ? "Getting your location..." : "Use Current Location"}
        </button>

        {permissionState === "denied" && !locationLoading && (
          <p className="location-hint" role="status">
            Location access is blocked. Enable it in your browser settings to use this feature.
          </p>
        )}

        {locationError && (
          <p className="location-error" role="alert">
            {locationError}
          </p>
        )}

        {origin && !locationError && (
          <p className="location-confirmed" role="status">
            Origin set: {origin.lat.toFixed(5)}, {origin.lng.toFixed(5)}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="directions-destination">
        <input
          type="text"
          placeholder="Destination latitude"
          value={destinationLat}
          onChange={(e) => setDestinationLat(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination longitude"
          value={destinationLng}
          onChange={(e) => setDestinationLng(e.target.value)}
          required
        />

        <ModeSelector value={mode} onChange={setMode} />

        <button type="submit" disabled={!origin || routeLoading}>
          {routeLoading ? "Calculating route..." : "Get Directions"}
        </button>
      </form>

      {routeError && (
        <div className="directions-error">
          <p role="alert">{routeError}</p>
          <button type="button" onClick={retry}>
            Retry
          </button>
        </div>
      )}

      {route && (
        <div className="directions-result">
          <p>
            Distance: {(route.distance / 1000).toFixed(1)} km — ETA:{" "}
            {Math.round(route.duration / 60)} min
          </p>
          <TurnByList instructions={route.instructions} />
        </div>
      )}
    </div>
  );
}

export default DirectionsForm;
