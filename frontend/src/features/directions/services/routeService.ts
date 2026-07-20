// frontend/src/features/directions/services/routeService.ts
import { fetchRoute } from "../../../api/routeApi";
import type {
  Coordinates,
  TransportMode,
  RouteResult,
  RouteErrorCode,
} from "../../../types/directions.types";

export type RouteServiceResult =
  | { success: true; route: RouteResult }
  | { success: false; error: string };

// Maps backend error codes to friendly, scenario-specific messages.
// Falls back to whatever message the backend sent if the code is unrecognized.
function getFriendlyMessage(code: RouteErrorCode | undefined, fallbackMessage?: string): string {
  switch (code) {
    case "INVALID_REQUEST":
      return fallbackMessage || "Please check your origin and destination and try again.";
    case "ROUTE_NOT_FOUND":
      return "No route could be found between these locations. Try a different destination.";
    case "ROUTING_SERVICE_UNAVAILABLE":
      return "The routing service is temporarily unavailable. Please try again shortly.";
    case "ROUTING_TIMEOUT":
      return "That took too long to respond. Please try again.";
    case "INTERNAL_ERROR":
      return "Something went wrong on our end. Please try again.";
    default:
      return fallbackMessage || "Something went wrong while calculating the route.";
  }
}

export async function getRoute(
  origin: Coordinates,
  destination: Coordinates,
  mode: TransportMode
): Promise<RouteServiceResult> {
  // Catches the "no internet connection" scenario before even attempting
  // the request, rather than waiting for fetch to fail.
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return {
      success: false,
      error: "You appear to be offline. Check your connection and try again.",
    };
  }

  try {
    const data = await fetchRoute(origin, destination, mode);

    if (data.status !== "ok") {
      return {
        success: false,
        error: getFriendlyMessage(data.error.code, data.error.message),
      };
    }

    return {
      success: true,
      route: {
        distance: data.distance,
        duration: data.duration,
        polyline: data.polyline,
        instructions: data.instructions,
      },
    };
  } catch {
    // fetch itself threw — network failure, DNS failure, backend unreachable, etc.
    return {
      success: false,
      error: "Could not reach the routing service. Check your connection and try again.",
    };
  }
}