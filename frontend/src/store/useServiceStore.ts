// where you integrate services e.g const API_BASE = "http://localhost:1818/api/services";
import { create } from 'zustand';
import { Service } from '../types/service.types';
import { normalizeService } from '../utils/transformService';
import { useAuthStore } from './useAuthStore';

const b_port = import.meta.env.VITE_BACKEND_PORT;
const API_BASE = `http://localhost:${b_port}/api/services`;

/** @addsuggestions-006-author Onke Mbingeleli
 * Shape of the data submitted via the "Suggest a place" form.
 */
export interface SuggestionPayload {
  category: string;
  name: string;
  area: string;
  notes: string;
  phone: string;
  website: string;
  lat: number;
  lng: number;
  userId: string;
  userEmail: string;
}

interface ServiceStore {
  services: Service[];
  categories: string[];
  loading: boolean;
  error: string | null;
  fetchAllServices: () => Promise<void>;

  // ── suggestion feature ────────────────────────────────
  /** Submit a new service suggestion to the backend. */
  submitSuggestion: (payload: SuggestionPayload) => Promise<void>;
}

export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  categories: [],
  loading: false,
  error: null,

  fetchAllServices: async () => {
    try {
    set({ loading: true, error: null });

    const token = useAuthStore.getState().token

    const response = await fetch(
        `${API_BASE}/approved?minLat=-34&maxLat=-33&minLng=18&maxLng=19`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );

      if (!response.ok) {
        throw new Error(`Failed to fetch services: ${response.status}`);
      }

      const data = await response.json();
      const rawServices: unknown[] = data.data || [];

      const normalizedServices = rawServices
        .map(normalizeService)
        .filter((s: Service | null): s is Service => s !== null);

      const uniqueCategories = Array.from(
        new Set(normalizedServices.map((service) => service.category))
      );

      set({
        services: normalizedServices,
        categories: uniqueCategories,
        loading: false,
      });

    } catch (err: any) {
      console.error('Error fetching services:', err);
      set({
        error: err?.message || String(err),
        services: [],
        loading: false,
      });
    }
  },

  // ── suggestion feature ────────────────────────────────

  submitSuggestion: async (payload: SuggestionPayload) => {
    const token = useAuthStore.getState().token;

    const response = await fetch(`${API_BASE}/suggest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        category: payload.category,
        name: payload.name,
        area: payload.area,
        notes: payload.notes,
        phone: payload.phone,
        website: payload.website,
        latitude: payload.lat,
        longitude: payload.lng,
        submittedBy: payload.userId,
        userEmail: payload.userEmail,
        status: 'pending',
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data?.message || `Failed to submit suggestion: ${response.status}`);
    }
  },

}));

export default useServiceStore;