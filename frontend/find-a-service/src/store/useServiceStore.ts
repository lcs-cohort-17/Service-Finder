import { useEffect, useState } from "react";
import { Service, mockServices } from "../types/map.types";
import type { MapMarker } from "../types/map.types";
import { serviceRepository } from "../database/serviceRepository";
import { transformServiceData } from "../utils/transformData";




const API_BASE =
  import.meta.env.VITE_API_BASE_URL ??
  "http://localhost:8769/api/services";

const DEFAULT_BOUNDS = {
  minLat: Number(import.meta.env.VITE_MAP_MIN_LAT ?? "-34.35"),
  maxLat: Number(import.meta.env.VITE_MAP_MAX_LAT ?? "-33.55"),
  minLng: Number(import.meta.env.VITE_MAP_MIN_LNG ?? "18.0"),
  maxLng: Number(import.meta.env.VITE_MAP_MAX_LNG ?? "19.0"),
};

export const useServiceStore = () => {
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [offline, setOffline] = useState(!navigator.onLine);

  const convertToMarkers = (services: Service[]): MapMarker[] =>
    services
      .filter(
        (service) =>
          Number.isFinite(service.latitude) &&
          Number.isFinite(service.longitude)
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

  const fallbackToMock = (reason?: unknown) => {
    if (reason instanceof Error) {
      console.warn("Falling back to mockServices:", reason.message);
    } else {
      console.warn("Falling back to mockServices");
    }

    setError("");
    setMarkers(convertToMarkers(mockServices));
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      // 1) Cached services first
      const cached = await serviceRepository.getCachedServices();

      if (cached && cached.length > 0) {
        const cachedServices: Service[] = cached.map((raw) =>
          transformServiceData(raw)
        );

        setMarkers(convertToMarkers(cachedServices));

        // If offline, use cache only
        if (!navigator.onLine) {
          setOffline(true);
          return;
        }

        // If cache is still valid, stop here
        const expired = await serviceRepository.isCacheExpired();
        if (!expired) {
          return;
        }
      }

      // 2) Fetch latest data from backend
      const response = await fetch(buildServicesUrl());

      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }

      const result: unknown = await response.json();

      // Backend might return { data: [...] }.
      const rawList: unknown[] =
        typeof result === "object" && result !== null &&
        "data" in result &&
        Array.isArray((result as { data?: unknown }).data)
          ? ((result as { data?: unknown }).data as unknown[])
          : [];

      const services: Service[] = rawList.map((raw) =>
        transformServiceData(raw as unknown as Parameters<typeof transformServiceData>[0])
      );

      // 3) Save latest data to IndexedDB (best-effort)
      await serviceRepository.cacheServices(services);

      // 4) Update map markers
      setMarkers(convertToMarkers(services));
    } catch (err) {
      // Ensure graceful fallback for "Failed to fetch" screens
      console.error(err);

      // Explicit SEARCH-003 graceful fallback:
      // - If cache is empty OR any error occurs, always fall back to mockServices.
      try {
        const cached = await serviceRepository.getCachedServices();
        if (cached && cached.length > 0) {
          const cachedServices: Service[] = cached.map((raw) =>
            transformServiceData(raw)
          );
          setMarkers(convertToMarkers(cachedServices));
          setError("");
          return;
        }
      } catch (cacheErr) {
        console.warn("Cache read failed, falling back to mockServices:", cacheErr);
      }

      setError("");
      setMarkers(convertToMarkers(mockServices));
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
  }, []);

  return {
    markers,
    loading,
    error,
    offline,
    fetchServices,
  };
};

