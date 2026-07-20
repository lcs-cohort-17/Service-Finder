// frontend/src/api/routeApi.ts
import type { Coordinates, TransportMode, DirectionsApiResponse } from "../types/directions.types";

const API_BASE = "http://localhost:5000/api/directions";

// Raw call to the backend directions endpoint. No error-message mapping or
// retry logic here — that lives in features/directions/services/routeService.ts.
// This function's only job is: send the request, return the parsed JSON.
export async function fetchRoute(
  origin: Coordinates,
  destination: Coordinates,
  mode: TransportMode
): Promise<DirectionsApiResponse> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ origin, destination, mode }),
  });

  const data: DirectionsApiResponse = await response.json();
  return data;
}