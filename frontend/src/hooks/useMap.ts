// ===========================
// Lutfeeya - MAP-001 //
// ===========================

// src/hooks/useMap.ts
import { useEffect, useState, useCallback } from 'react';
import { Map as LeafletMap, LatLngExpression, LatLngBounds } from 'leaflet';

interface UseMapReturn {
  center: LatLngExpression;
  zoom: number;
  bounds: LatLngBounds | null;
  setCenter: (center: LatLngExpression) => void;
  setZoom: (zoom: number) => void;
  flyTo: (center: LatLngExpression, zoom?: number) => void;
  fitBounds: (bounds: LatLngBounds) => void;
}

export const useMap = (map: LeafletMap | null): UseMapReturn => {
  const [center, setCenterState] = useState<LatLngExpression>([0, 0]);
  const [zoom, setZoomState] = useState<number>(0);
  const [bounds, setBounds] = useState<LatLngBounds | null>(null);

  useEffect(() => {
    if (!map) return;

    const updateMapState = () => {
      const mapCenter = map.getCenter();
      setCenterState([mapCenter.lat, mapCenter.lng]);
      setZoomState(map.getZoom());
      setBounds(map.getBounds());
    };

    // Update state on map events
    map.on('moveend', updateMapState);
    map.on('zoomend', updateMapState);

    // Initial update
    updateMapState();

    return () => {
      map.off('moveend', updateMapState);
      map.off('zoomend', updateMapState);
    };
  }, [map]);

  const setCenter = useCallback((newCenter: LatLngExpression) => {
    if (map) {
      map.setView(newCenter, map.getZoom());
    }
  }, [map]);

  const setZoom = useCallback((newZoom: number) => {
    if (map) {
      map.setZoom(newZoom);
    }
  }, [map]);

  const flyTo = useCallback((newCenter: LatLngExpression, newZoom?: number) => {
    if (map) {
      map.flyTo(newCenter, newZoom || map.getZoom());
    }
  }, [map]);

  const fitBounds = useCallback((newBounds: LatLngBounds) => {
    if (map) {
      map.fitBounds(newBounds);
    }
  }, [map]);

  return {
    center,
    zoom,
    bounds,
    setCenter,
    setZoom,
    flyTo,
    fitBounds,
  };
};

export default useMap;
// ===========================
// Lutfeeya - MAP-001 //
// ===========================