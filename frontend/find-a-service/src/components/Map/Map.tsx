// ===========================
// Lutfeeya - MAP-001 //
// ===========================

// src/components/Map/Map.tsx
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { MapComponentProps } from '../../types/map.types';
import { fixLeafletIcons, createCustomIcon, createLocationPinIcon } from '../../utils/mapHelpers';
import { MAP_CONFIG } from '../../config/map.config';

// Fix Leaflet icons
fixLeafletIcons();

// Map event handler component
const MapEventHandler: React.FC<{
  onMove?: (center: L.LatLngExpression) => void;
  onZoom?: (zoom: number) => void;
  onClick?: (latlng: L.LatLngExpression) => void;
}> = ({ onMove, onZoom, onClick }) => {
  const map = useMapEvents({
    moveend: () => {
      if (onMove) {
        const center = map.getCenter();
        onMove([center.lat, center.lng]);
      }
    },
    zoomend: () => {
      if (onZoom) {
        onZoom(map.getZoom());
      }
    },
    click: (e) => {
      if (onClick) {
        onClick([e.latlng.lat, e.latlng.lng]);
      }
    },
  });
  return null;
};

const Map: React.FC<MapComponentProps> = ({
  center = MAP_CONFIG.defaultCenter,
  zoom = MAP_CONFIG.defaultZoom,
  className = '',
  markers = [],
  showZoomControl = true,
  showAttribution = true,
  interactive = true,
  onMove,
  onZoom,
  onReady,
  onClick,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Handle map initialization
  useEffect(() => {
    if (mapRef.current && !isMapReady) {
      setIsMapReady(true);
      if (onReady) {
        onReady(mapRef.current);
      }
    }
  }, [onReady, isMapReady]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={showAttribution}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        scrollWheelZoom={interactive}
        touchZoom={interactive}
        dragging={interactive}
        doubleClickZoom={interactive}
        boxZoom={interactive}
        ref={mapRef}
        whenReady={() => {
          setIsMapReady(true);
          if (onReady && mapRef.current) {
            onReady(mapRef.current);
          }
        }}
      >
        {/* Tile Layer */}
        <TileLayer
          attribution={MAP_CONFIG.tileLayer.attribution}
          url={MAP_CONFIG.tileLayer.url}
        />

        {/* Custom Zoom Control */}
        {showZoomControl && <ZoomControl position="topright" />}

        {/* Map Event Handlers */}
        <MapEventHandler
          onMove={onMove}
          onZoom={onZoom}
          onClick={onClick}
        />

        {/* Render Markers */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={marker.icon ? createCustomIcon(marker.icon) : createLocationPinIcon()}
            title={marker.title}
          >
            {marker.description && (
              <Popup>
                <div className="p-2 max-w-xs">
                  {marker.title && (
                    <h3 className="font-bold text-lg mb-1">{marker.title}</h3>
                  )}
                  <p className="text-sm text-gray-600">{marker.description}</p>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>

      {/* Loading State */}
      {!isMapReady && (
        <div className="map-loading">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-gray-600">Loading map...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
// ===========================
// Lutfeeya - MAP-001 //
// ===========================