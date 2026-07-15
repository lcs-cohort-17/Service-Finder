import { useEffect, useState } from "react";
import { MapMarker } from "../types/map.types";
import { serviceRepository } from "../database/serviceRepository";

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

export const useServiceStore = () => {
    const [markers, setMarkers] = useState<MapMarker[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [offline, setOffline] = useState(!navigator.onLine);

    const convertToMarkers = (
        services: ServiceResponse[]
    ): MapMarker[] =>
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

    const fetchServices = async () => {
        try {
            setLoading(true);
            setError("");

            // 1. Load cached services first
            const cached = await serviceRepository.getCachedServices();

            if (cached && cached.length > 0) {
                console.log("Loaded services from IndexedDB.");

                setMarkers(convertToMarkers(cached));

                // If offline, use cache only
                if (!navigator.onLine) {
                    console.log("Offline mode. Using cached services.");
                    return;
                }

                // If cache is still valid, stop here
                const expired =
                    await serviceRepository.isCacheExpired();

                if (!expired) {
                    console.log("Cache still valid.");
                    return;
                }

                console.log("Cache expired. Refreshing...");
            }

            // 2. Fetch latest data from backend
            console.log("Fetching services from backend...");

            const response = await fetch(buildServicesUrl());

            if (!response.ok) {
                throw new Error("Failed to fetch services.");
            }

            const result = await response.json();

            const services: ServiceResponse[] = Array.isArray(result.data)
                ? result.data
                : [];

            // 3. Save latest data to IndexedDB
            await serviceRepository.cacheServices(services);

            console.log("IndexedDB cache updated.");

            // 4. Update map markers
            setMarkers(convertToMarkers(services));
        } catch (err) {
            console.error(err);

            const cached = await serviceRepository.getCachedServices();

            // Only show an error if we have no cached data
            if (!cached || cached.length === 0) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load services."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleOnline = () => {
            console.log("Back online.");
            setOffline(false);

            // Refresh when connection returns
            fetchServices();
        };

        const handleOffline = () => {
            console.log("Offline.");
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