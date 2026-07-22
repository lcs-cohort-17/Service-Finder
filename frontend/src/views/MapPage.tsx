import React from 'react';
import Map from '../components/map/Map';
import type { MapMarker } from '../types/map.types';

const MapPage: React.FC = () => {
  const projectLocation: [number, number] = [-33.9249, 18.4241];
  const markers: MapMarker[] = [
    {
      id: 'service-finder-hq',
      position: projectLocation,
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

  return (
    <main className="flex-1 min-h-0 p-3 z-0 sm:p-4 md:p-5">
      <div className=" mx-auto flex h-[calc(100vh-80px)] max-w-7xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
        <div className="flex-1 min-h-0 w-full z-0">
          <Map
            center={projectLocation}
            zoom={13}
            markers={markers}
            className="relative h-full w-full"
          />
        </div>
      </div>
    </main>
  );
};

export default MapPage;
