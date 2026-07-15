import { useEffect, useMemo, useState } from "react";
import { MapMarker } from "../types/map.types";
import { serviceRepository } from "../database/serviceRepository";
import type { CategoryId } from "../types/categories";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:8769/api/services";

const DEFAULT_BOUNDS = {
  minLat: Number(import.meta.env.VITE_MAP_MIN_LAT ?? "-34.35"),
  maxLat: Number(import.meta.env.VITE_MAP_MAX_LAT ?? "-33.55"),
  minLng: Number(import.meta.env.VITE_MAP_MIN_LNG ?? "18.0"),
  maxLng: Number(import.meta.env.VITE_MAP_MAX_LNG ?? "19.0"),
};

interface ServiceResponse {
  id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
}

const convertToMarkers = (services: ServiceResponse[]): MapMarker[] =>
  services
    .filter(
      (service) =>
        Number.isFinite(service.latitude) && Number.isFinite(service.longitude)
    )
    .map((service) => ({
      id: service.id,
      position: [service.latitude, service.longitude],
      title: service.name,
      description: service.category,
    }));

const buildServicesUrl = () => {
  const url = new URL(API_BASE);

  Object.entries(DEFAULT_BOUNDS).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url.toString();
};

const normalizeSelectedCategories = (selectedCategories: CategoryId[]) =>
  selectedCategories?.length ? new Set(selectedCategories) : null;

export const useServiceMarkers = (selectedCategories: CategoryId[]) => {
  const [allServices, setAllServices] = useState<ServiceResponse[]>([]);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [offline, setOffline] = useState(!navigator.onLine);

  const selectedSet = useMemo(
    () => normalizeSelectedCategories(selectedCategories),
    [selectedCategories]
  );

  // Filter in-memory whenever selection changes
  useEffect(() => {
    const filtered = selectedSet
      ? allServices.filter((s) => selectedSet.has(s.category as CategoryId))
      : allServices;

    setMarkers(convertToMarkers(filtered));
  }, [allServices, selectedSet]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const cached = await serviceRepository.getCachedServices();

      if (cached && cached.length > 0) {
        setAllServices(cached as unknown as ServiceResponse[]);

        if (!navigator.onLine) {
          setOffline(true);
          return;
        }

        const expired = await serviceRepository.isCacheExpired();
        if (!expired) {
          return;
        }
      }

      const response = await fetch(buildServicesUrl());

      if (!response.ok) {
        throw new Error("Failed to fetch services.");
      }

      const result = await response.json();

      const services: ServiceResponse[] = Array.isArray(result.data)
        ? result.data
        : [];

      setAllServices(services);

      await serviceRepository.cacheServices(services as any);
    } catch (err) {
      console.error(err);
      const cached = await serviceRepository.getCachedServices();
      if (!cached || cached.length === 0) {
        setError(
          err instanceof Error ? err.message : "Failed to load services."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setOffline(false);
      fetchServices();
    };

    const handleOffline = () => {
      setOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    fetchServices();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    markers,
    loading,
    error,
    offline,
    fetchServices,
  };
};

