import React from 'react';
import Map from './components/map/Map';
import type { MapMarker } from './types/map.types';

function App() {
  const projectLocation: [number, number] = [-33.9249, 18.4241];
  const locationMarkers: MapMarker[] = [
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
    <div className="min-h-screen h-screen overflow-hidden bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm px-4 py-3 flex-shrink-0">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-xl font-semibold text-gray-800">Service Finder</h1>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-3 sm:p-4 md:p-5">
        <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="flex-1 min-h-0 w-full">
            <Map center={projectLocation} zoom={13} markers={locationMarkers} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
