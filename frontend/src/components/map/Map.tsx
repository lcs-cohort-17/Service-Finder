import { useRef, useState } from 'react';
import {
  MapContainer as LeafletMapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { MapComponentProps, MapMarker } from '../../types/map.types';
import { createCustomIcon, createLocationPinIcon, fixLeafletIcons } from '../../utils/mapHelper';
import { MAP_CONFIG } from '../../config/map.config';
import MapControls from './MapControls';
import MarkerPreview from './MarkerPreview';

fixLeafletIcons();

interface MapEventHandlerProps {
  onMove?: (center: L.LatLngExpression) => void;
  onZoom?: (zoom: number) => void;
  onClick?: (latlng: L.LatLngExpression) => void;
}

const MapEventHandler = ({ onMove, onZoom, onClick }: MapEventHandlerProps) => {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      onMove?.([center.lat, center.lng]);
    },
    zoomend: () => onZoom?.(map.getZoom()),
    click: (event) => onClick?.([event.latlng.lat, event.latlng.lng]),
  });

  return null;
};

const Map = ({
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
}: MapComponentProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  return (
    <div className={`map-wrapper ${className}`}>
      <LeafletMapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
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
          if (mapRef.current) onReady?.(mapRef.current);
        }}
      >
        <TileLayer attribution={MAP_CONFIG.tileLayer.attribution} url={MAP_CONFIG.tileLayer.url} />
        <MapEventHandler onMove={onMove} onZoom={onZoom} onClick={onClick} />

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={marker.icon ? createCustomIcon(marker.icon) : createLocationPinIcon()}
            title={marker.title}
            eventHandlers={{
              click: () => {
                setSelectedMarker(marker);
                marker.onClick?.();
              },
            }}
          >
            {marker.description && (
              <Popup>
                <strong>{marker.title ?? 'Service location'}</strong>
                <p>{marker.description}</p>
              </Popup>
            )}
          </Marker>
        ))}
      </LeafletMapContainer>

      {showZoomControl && (
        <MapControls
          onZoomIn={() => mapRef.current?.zoomIn()}
          onZoomOut={() => mapRef.current?.zoomOut()}
          onReset={() => mapRef.current?.setView(MAP_CONFIG.defaultCenter, MAP_CONFIG.defaultZoom)}
        />
      )}

      {selectedMarker && (
        <MarkerPreview marker={selectedMarker} onClose={() => setSelectedMarker(null)} />
      )}

      {!isMapReady && <div className="map-loading">Loading map...</div>}
    </div>
  );
};

export default Map;
