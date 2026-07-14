// src/components/LocationButton.jsx
import { useEffect } from "react";
import useLocationStore from "../store/useLocationStore";
 
// onLocationFound: optional callback(coordinates) — fire when a location is
// successfully retrieved, e.g. to populate the Origin field in Directions-003
function LocationButton({ onLocationFound }) {
  const {
    coordinates,
    permissionState,
    loading,
    error,
    checkPermission,
    getCurrentLocation,
  } = useLocationStore();
 
  useEffect(() => {
    checkPermission();
  }, [checkPermission]);
 
  useEffect(() => {
    if (coordinates && onLocationFound) {
      onLocationFound(coordinates);
    }
  }, [coordinates, onLocationFound]);
 
  const handleClick = () => {
    getCurrentLocation();
  };
 
  return (
    <div className="location-button-wrapper">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="location-button"
      >
        {loading ? "Getting your location..." : "Use Current Location"}
      </button>
 
      {permissionState === "denied" && !loading && (
        <p className="location-hint" role="status">
          Location access is blocked. Enable it in your browser settings to use this feature.
        </p>
      )}
 
      {error && (
        <p className="location-error" role="alert">
          {error}
        </p>
      )}
 
      {coordinates && !error && (
        <p className="location-confirmed" role="status">
          Location set: {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
        </p>
      )}
    </div>
  );
}
 
export default LocationButton;