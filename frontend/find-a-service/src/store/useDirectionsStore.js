// src/store/useDirectionsStore.js
import { create } from "zustand";

const API_BASE = "http://localhost:5000/api/directions";

// Maps backend error codes to friendly, scenario-specific messages.
// Falls back to whatever message the backend sent if the code is unrecognized.
function getFriendlyMessage(code, fallbackMessage) {
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

const useDirectionsStore = create((set, get) => ({
  route: null, // { distance, duration, polyline, instructions }
  loading: false,
  error: null,
  lastRequest: null, // { origin, destination, mode } — used by retry()

  // origin/destination: { lat, lng }
  // mode: "driving" | "walking" | "cycling"
  getRoute: async (origin, destination, mode) => {
    set({
      loading: true,
      error: null,
      lastRequest: { origin, destination, mode },
    });

    // Catches the "no internet connection" scenario before even attempting
    // the request, rather than waiting for fetch to fail.
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      set({
        error: "You appear to be offline. Check your connection and try again.",
        loading: false,
      });
      return;
    }

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination, mode }),
      });

      const data = await response.json();

      if (!response.ok || data.status !== "ok") {
        const code = data.error?.code;
        const message = data.error?.message || data.message;
        set({
          error: getFriendlyMessage(code, message),
          loading: false,
          route: null,
        });
        return;
      }

      set({
        route: {
          distance: data.distance,
          duration: data.duration,
          polyline: data.polyline,
          instructions: data.instructions,
        },
        loading: false,
        error: null,
      });
    } catch {
      // fetch itself threw — network failure, DNS failure, backend unreachable, etc.
      set({
        error: "Could not reach the routing service. Check your connection and try again.",
        loading: false,
        route: null,
      });
    }
  },

  // Re-runs the last failed (or successful) request with the same params.
  retry: () => {
    const { lastRequest, getRoute } = get();
    if (!lastRequest) return;
    getRoute(lastRequest.origin, lastRequest.destination, lastRequest.mode);
  },

  clearRoute: () => set({ route: null, error: null, lastRequest: null }),
}));

export default useDirectionsStore;