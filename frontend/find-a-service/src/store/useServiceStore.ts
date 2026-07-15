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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const convertToMarkers = (services: ServiceResponse[]): MapMarker[] =>
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

            // 1. Check IndexedDB first
            const cached =
                await serviceRepository.getCachedServices();

            if (cached) {
                console.log("Loaded services from IndexedDB.");

                setMarkers(convertToMarkers(cached));

                setLoading(false);
                return;
            }

            console.log("Fetching services from backend...");

            // 2. Fetch from backend
            const response = await fetch(buildServicesUrl());

            if (!response.ok) {
                throw new Error("Failed to fetch services.");
            }

            const result = await response.json();
            const services = Array.isArray(result.data) ? result.data : [];

            // 3. Cache locally
            await serviceRepository.cacheServices(services);

            // 4. Display markers
            setMarkers(convertToMarkers(services));
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to load services."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return {
        markers,
        loading,
        error,
        fetchServices,
    };
};
