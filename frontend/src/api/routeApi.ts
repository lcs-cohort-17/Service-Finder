// frontend/src/api/routeApi.ts
import type { Coordinates, TransportMode, DirectionsApiResponse } from "../types/directions.types";

const API_BASE = "http://localhost:5000/api/directions";

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
