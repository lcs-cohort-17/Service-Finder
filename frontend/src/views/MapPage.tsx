import { useMemo, useState } from 'react';
import Map from '../components/map/Map';
import DirectionsForm, {
  type RouteDetails,
} from '../features/directions/components/DirectionsForm';
import type { MapMarker } from '../types/map.types';
import '../features/directions/directions.css';

const serviceLocation: [number, number] = [-33.9249, 18.4241];

const serviceMarkers: MapMarker[] = [
  {
    id: 'service-finder-hq',
    position: serviceLocation,
    title: 'Service Finder',
    description: 'Cape Town city centre',
  },
  {
    id: 'v-a-waterfront',
    position: [-33.9036, 18.4215],
    title: 'V&A Waterfront',
    description: 'Service location near the waterfront',
  },
  {
    id: 'gardens',
    position: [-33.9358, 18.4126],
    title: 'Gardens',
    description: 'Service location in Gardens',
  },
  {
    id: 'woodstock',
    position: [-33.9273, 18.4463],
    title: 'Woodstock',
    description: 'Service location in Woodstock',
  },
  {
    id: 'green-point',
    position: [-33.9069, 18.4098],
    title: 'Green Point',
    description: 'Service location in Green Point',
  },
];

function parseLatLng(value: string): [number, number] | null {
  const match = value.trim().match(/^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/);
  if (!match) return null;

  const lat = Number(match[1]);
  const lng = Number(match[2]);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;

  return [lat, lng];
}

const MapPage: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [mapPickTarget, setMapPickTarget] = useState<'origin' | 'destination' | null>(null);

  const markers = useMemo(() => {
    const baseMarkers = [...serviceMarkers];
    const originPos = parseLatLng(origin);
    const destinationPos = parseLatLng(destination);

    if (originPos) {
      baseMarkers.push({
        id: 'origin-marker',
        position: originPos,
        title: 'Origin',
        description: 'Selected origin',
      });
    }

    if (destinationPos) {
      baseMarkers.push({
        id: 'destination-marker',
        position: destinationPos,
        title: 'Destination',
        description: 'Selected destination',
      });
    }

    return baseMarkers;
  }, [origin, destination]);

  const handleMapClick = (latlng: [number, number]) => {
    const value = `${latlng[0]}, ${latlng[1]}`;
    if (mapPickTarget === 'origin') {
      setOrigin(value);
      setMapPickTarget(null);
    } else if (mapPickTarget === 'destination') {
      setDestination(value);
      setMapPickTarget(null);
    }
  };

  const handleGetDirections = (routeDetails: RouteDetails) => {
    console.log('Directions requested:', routeDetails);
  };

  return (
    <main className="directions-page">
      <aside className="directions-panel">
        <DirectionsForm
          onGetDirections={handleGetDirections}
          origin={origin}
          destination={destination}
          onOriginChange={setOrigin}
          onDestinationChange={setDestination}
          mapPickTarget={mapPickTarget}
          onMapPickChange={setMapPickTarget}
        />
      </aside>

      <section className="map-placeholder" aria-label="Map area">
        <Map
          center={serviceLocation}
          zoom={13}
          markers={markers}
          className="h-full w-full"
          onClick={handleMapClick}
        />
      </section>
    </main>
  );
};

export default MapPage;
