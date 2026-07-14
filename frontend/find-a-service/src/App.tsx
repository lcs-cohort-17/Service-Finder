import React from "react";
import Map from "./components/Map/Map";
import { useServiceStore } from "./store/useServiceStore";
// uncomment the lines below when testing backend logic
// it is commented out to avoid errors when the backend is not running
function App() {
  const projectLocation: [number, number] = [-33.9249, 18.4241];
  const { markers, loading, error } = useServiceStore();

  if (loading) {
    return <h2>Loading services...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="min-h-screen h-screen overflow-hidden bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm px-4 py-3 flex-shrink-0">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-xl font-semibold text-gray-800">
            Service Finder
          </h1>
        </div>
      </header>

      <main className="flex-1 min-h-0 p-3 sm:p-4 md:p-5">
        <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="flex-1 min-h-0 w-full">
            <Map center={projectLocation} zoom={13} markers={markers}/> 
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
// This goes in the map function
//markers={markers} 