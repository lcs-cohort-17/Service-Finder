import { useEffect, useMemo } from 'react';
import MapContainer from './map/MapContainer';
import { useServiceStore } from '../store/useServiceStore';
import { useFilteredServices } from '../features/filters/hooks/usefilters';
import { getCategoryMarkerIconUrl } from '../components/FilterButtons/categoryStyles';
import { getCategoryStyle } from '../components/FilterButtons/categoryStyles';
import { getDirectionsUrl } from '../utils/urlGenerators';
import { MapPin, Navigation } from 'lucide-react';

interface MapPageProps { selectedCategories: string[]; }

function DirectionsButton({ latitude, longitude }: { latitude: number; longitude: number }) {
  const openDirections = () => {
    // Open synchronously so browsers do not block the new Google Maps tab.
    const directionsWindow = window.open('', '_blank');
    const openUrl = (url: string) => {
      if (directionsWindow) directionsWindow.location.href = url;
      else window.location.href = url;
    };

    if (!navigator.geolocation) {
      openUrl(getDirectionsUrl(latitude, longitude));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => openUrl(getDirectionsUrl(latitude, longitude, {
        latitude: coords.latitude,
        longitude: coords.longitude,
      })),
      () => openUrl(getDirectionsUrl(latitude, longitude)),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  };

  return <button className="directions-button" type="button" onClick={openDirections}><Navigation size={16} />Get directions</button>;
}

export default function MapPage({ selectedCategories }: MapPageProps) {
  const { services, loading, error, selectedService, fetchAllServices, selectService } = useServiceStore();
  useEffect(() => { void fetchAllServices(); }, [fetchAllServices]);
  const filteredServices = useFilteredServices(services, selectedCategories);
  const markers = useMemo(() => filteredServices.map((service) => ({
    id: service.id,
    position: [service.latitude, service.longitude] as [number, number],
    title: service.name,
    description: service.category,
    icon: getCategoryMarkerIconUrl(service.category),
    onClick: () => selectService(service.id),
    isSelected: selectedService?.id === service.id,
    popupContent: selectedService?.id === service.id ? (
      <div className="marker-details-card">
        <div className="marker-card-header">
          <span className="marker-category" style={{ color: getCategoryStyle(service.category).color, backgroundColor: `${getCategoryStyle(service.category).color}18` }}>{service.category}</span>
        </div>
        <h3>{service.name}</h3>
        <div className="marker-address"><MapPin size={16} /><span>{service.address ?? 'Address not available'}</span></div>
        <DirectionsButton latitude={service.latitude} longitude={service.longitude} />
      </div>
    ) : undefined,
  })), [filteredServices, selectService, selectedService]);

  return (
    <main className="map-area">
      <MapContainer center={[-33.9249, 18.4241]} zoom={13} markers={markers} containerClassName="map-surface" />
      {loading && <p className="map-status">Loading services…</p>}
      {error && <p className="map-status map-error">{error}</p>}
    </main>
  );
}
