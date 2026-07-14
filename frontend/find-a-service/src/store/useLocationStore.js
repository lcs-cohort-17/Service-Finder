import { create } from "zustand";

// Friendly messages for the standard Geolocation error codes
function getErrorMessage(error) {
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

const useLocationStore = create((set) => ({
  coordinates: null, // { lat, lng }
  permissionState: "unknown", // "granted" | "denied" | "prompt" | "unknown"
  loading: false,
  error: null,

  // Checks current permission state without triggering a prompt.
  // Not all browsers support the Permissions API, so this fails gracefully.
  checkPermission: async () => {
    if (!navigator.permissions) {
      set({ permissionState: "unknown" });
      return;
    }

    try {
      const result = await navigator.permissions.query({ name: "geolocation" });
      set({ permissionState: result.state });

      // Keep state in sync if the user changes permission via browser UI
      result.onchange = () => {
        set({ permissionState: result.state });
      };
    } catch {
      set({ permissionState: "unknown" });
    }
  },

  getCurrentLocation: () => {
    if (!navigator.geolocation) {
      set({
        error: "Geolocation is not supported by your browser.",
        loading: false,
      });
      return;
    }

    set({ loading: true, error: null });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        set({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          permissionState: "granted",
          loading: false,
          error: null,
        });
      },
      (error) => {
        set({
          error: getErrorMessage(error),
          permissionState: error.code === error.PERMISSION_DENIED ? "denied" : "prompt",
          loading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  },

  clearLocation: () => set({ coordinates: null, error: null }),
}));

export default useLocationStore;