import React, { useState, useEffect } from "react";
import TransportModeSelector from "./TransportModeSelector"; // Ensure this can accept .tsx usage or has types
import InstructionList, { NavigationStep } from "./InstructionList";

interface Coordinate {
  lat: number;
  lng: number;
}

interface NavigationContainerProps {
  origin: Coordinate;
  destination: Coordinate;
}

interface RouteResponseData {
  distance: string;
  duration: string;
  polyline: string;
  instructions: NavigationStep[];
}

const NavigationContainer: React.FC<NavigationContainerProps> = ({ origin, destination }) => {
  const [transportMode, setTransportMode] = useState<string>("driving");
  const [routeData, setRouteData] = useState<RouteResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!origin?.lat || !origin?.lng || !destination?.lat || !destination?.lng) return;

    const fetchRoute = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch("/api/directions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            origin: { lat: origin.lat, lng: origin.lng },
            destination: { lat: destination.lat, lng: destination.lng },
            mode: transportMode,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to calculate navigation route.");
        }

        const data: RouteResponseData = await response.json();
        setRouteData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
        setRouteData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [origin?.lat, origin?.lng, destination?.lat, destination?.lng, transportMode]);

  return (
    <div className="navigation-panel" style={{ padding: "20px", maxWidth: "400px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
      <TransportModeSelector value={transportMode} onChange={setTransportMode} />
      
      {loading && <div className="loading-state" style={{ margin: "20px 0", color: "#0066cc" }}>Calculating best route...</div>}
      
      {error && <div className="error-banner" style={{ margin: "20px 0", padding: "10px", background: "#ffe6e6", color: "#cc0000", borderRadius: "4px" }}>{error}</div>}
      
      {routeData && !loading && (
        <div className="route-results" style={{ marginTop: "20px" }}>
          <div className="summary-card" style={{ padding: "12px", background: "#f9f9f9", borderRadius: "4px", borderLeft: "4px solid #00cc66", textAlign: "left" }}>
            <h4 style={{ margin: "0 0 5px 0" }}>Estimated Arrival: {routeData.duration}</h4>
            <p style={{ margin: 0, color: "#555" }}>Total Distance: {routeData.distance}</p>
          </div>

          <InstructionList steps={routeData.instructions} />
        </div>
      )}
    </div>
  );
};

export default NavigationContainer;
