import { create } from "zustand";
 
const API_BASE = "http://localhost:5000/api/directions";
 
const useDirectionsStore = create((set) => ({
  route: null, // { distance, duration, polyline, instructions }
  loading: false,
  error: null,
 
  // origin/destination: { lat, lng }
  // mode: "driving" | "walking" | "cycling"
  getRoute: async (origin, destination, mode) => {
    set({ loading: true, error: null });
 
    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination, mode }),
      });
 
      const data = await response.json();
 
      if (!response.ok || data.status !== "ok") {
        set({
          error: data.message || "Could not calculate a route. Please try again.",
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
      set({
        error: "Could not reach the routing service. Check your connection and try again.",
        loading: false,
        route: null,
      });
    }
  },
 
  clearRoute: () => set({ route: null, error: null }),
}));
 
export default useDirectionsStore;
 