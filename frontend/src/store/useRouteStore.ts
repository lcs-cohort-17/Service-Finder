import { create } from 'zustand';

interface RouteState {
  origin: string;
  destination: string;
  routeCoordinates: [number, number][];
  instructions: string[];
  eta: string | null;
  distance: string | null;

  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setRouteCoordinates: (coords: [number, number][]) => void;
  setInstructions: (instructions: string[]) => void;
  setEta: (eta: string | null) => void;
  setDistance: (distance: string | null) => void;

  // Directions-005: Clean up all states on reset
  resetNavigation: () => void;
}

export const useRouteStore = create<RouteState>((set) => ({
  origin: '',
  destination: '',
  routeCoordinates: [],
  instructions: [],
  eta: null,
  distance: null,

  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setRouteCoordinates: (routeCoordinates) => set({ routeCoordinates }),
  setInstructions: (instructions) => set({ instructions }),
  setEta: (eta) => set({ eta }),
  setDistance: (distance) => set({ distance }),

  resetNavigation: () =>
    set({
      origin: '',
      destination: '',
      routeCoordinates: [],
      instructions: [],
      eta: null,
      distance: null,
    }),
}));