import { create } from 'zustand';
import type { Service } from '../types/service.types';
import { normalizeService } from '../utils/transformService';
import { useAuthStore } from './useAuthStore';

const port = import.meta.env.VITE_BACKEND_PORT ?? '1818';
const API_BASE = `http://localhost:${port}/api/services`;

interface ServiceStore {
  services: Service[];
  categories: string[];
  loading: boolean;
  error: string | null;
  selectedService: Service | null;
  fetchAllServices: () => Promise<void>;
  selectService: (id: string) => void;
  clearSelectedService: () => void;
}

export const useServiceStore = create<ServiceStore>((set) => ({
  services: [], categories: [], loading: false, error: null, selectedService: null,

  fetchAllServices: async () => {
    try {
      set({ loading: true, error: null });
      const token = useAuthStore.getState().token;
      const response = await fetch(`${API_BASE}/approved?minLat=-34&maxLat=-33&minLng=18&maxLng=19`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) throw new Error(`Failed to fetch services: ${response.status}`);

      const data = await response.json();
      const services = (data.data ?? []).map(normalizeService)
        .filter((service: Service | null): service is Service => service !== null);
      set({
        services,
        categories: Array.from(new Set(services.map((service) => service.category))),
        loading: false,
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : String(error), services: [], loading: false });
    }
  },

  selectService: (id) => set((state) => ({
    selectedService: state.services.find((service) => service.id === id) ?? null,
  })),
  clearSelectedService: () => set({ selectedService: null }),
}));

export default useServiceStore;
