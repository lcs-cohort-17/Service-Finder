import React from 'react';
import MapContainer from './map/MapContainer';

const MapPage: React.FC = () => {
  const projectLocation: [number, number] = [-33.9249, 18.4241];

  return (
    <main className="flex-1 min-h-0 p-3 sm:p-4 md:p-5">
      <div className="mx-auto flex h-[calc(100vh-80px)] max-w-7xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
        <div className="flex-1 min-h-0 w-full">
          <MapContainer
            center={projectLocation}
            zoom={13}
            height="100%"
            width="100%"
            containerClassName="rounded-xl"
          />
        </div>
      </div>
    </main>
  );
};

export default MapPage;
