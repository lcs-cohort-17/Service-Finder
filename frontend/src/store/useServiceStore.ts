// where you integrate services e.g const API_BASE = "http://localhost:1818/api/services";
import { create } from 'zustand';
import { Service } from '../types/service.types';
import { normalizeService } from '../utils/transformService';
import { useAuthStore } from './useAuthStore';

const b_port = import.meta.env.VITE_BACKEND_PORT;
const API_BASE = `http://localhost:${b_port}/api/services`;

interface ServiceStore {
  services: Service[];
  categories: string[];
  loading: boolean;
  error: string | null;
  fetchAllServices: () => Promise<void>;
  fetchAllPendingServices: () => Promise<void>;
  moderateSuggestedServices: (id: string, status: 'approved' | 'declined') => Promise<void>;
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

fetchAllPendingServices: async () => {
    try {
      set({ loading: true, error: null });
 
      const token = useAuthStore.getState().token;
 
      const response = await fetch(`${API_BASE}/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
 
      if (!response.ok) {
        throw new Error(`Failed to fetch pending services: ${response.status}`);
      }
 
      const data = await response.json();
      // Fix: the /pending endpoint returns { services: [...] }, not { data: [...] }.
      const rawServices: unknown[] = data.services || data.data || [];
 
      const normalizedServices = rawServices
        .map(normalizeService)
        .filter((s: Service | null): s is Service => s !== null);
 
      set({
        services: normalizedServices,
        loading: false,
      });
    } catch (err: any) {
      console.error('Error fetching pending services:', err);
      set({
        error: err?.message || String(err),
        services: [],
        loading: false,
      });
    }
  },
 
  // Approves or declines a single pending suggestion (ADMIN-010 Approve/Reject).
  // Fix: previous version had no id/status params, hit a literal "/moderate/:id"
  // URL, and tried to re-parse the response as a full services array — but the
  // moderate endpoint returns just { id, status }. This now sends the real
  // request and updates that one item locally instead of re-normalizing.
  moderateSuggestedServices: async (id, status) => {
    try {
      set({ error: null });
 
      const token = useAuthStore.getState().token;
 
      const response = await fetch(`${API_BASE}/moderate/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
 
      if (!response.ok) {
        throw new Error(`Failed to update service: ${response.status}`);
      }
 
      // Remove the moderated suggestion from the pending list locally,
      // rather than re-fetching everything.
      set((state) => ({
        services: state.services.filter((service) => service.id !== id),
      }));
    } catch (err: any) {
      console.error('Error moderating service:', err);
      set({
        error: err?.message || String(err),
      });
    }
  },

}));

export default useServiceStore;