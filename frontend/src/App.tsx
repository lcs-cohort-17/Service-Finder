<<<<<<< HEAD
import { useState } from "react";
import FilterButtons from "./components/FilterButtons/FilterButtons";
import { useFilteredServices } from "./features/filters/hooks/usefilters";
import type { Service } from "./types/service.types";
import "./index.css";
=======
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import MapPage from './views/MapPage';
import Login from './views/Login';
>>>>>>> 493eb1d48a930f755b8b0805aa321d5124b07b52

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // The actual service list is populated elsewhere (Firestore + external
  // API integration). This component only needs to know its shape so it
  // can filter whatever list it is given.
  const [services] = useState<Service[]>([]);

  // Recomputes automatically whenever `services` or `selectedCategories`
  // change, so the map re-renders with the correct markers without a
  // page refresh.
  const filteredServices = useFilteredServices(services, selectedCategories);

  return (
<<<<<<< HEAD
    <div className="app">
      <aside className="sidebar">
        <FilterButtons
          selectedCategories={selectedCategories}
          onSelectionChange={setSelectedCategories}
        />
      </aside>

      <main className="map-area">
        <div className="map-placeholder">
          Map goes here ({filteredServices.length} of {services.length}{" "}
          services shown)
        </div>
      </main>
    </div>
=======
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm px-4 py-3">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link to="/" className="text-xl font-semibold text-gray-800">
              Service Finder
            </Link>
            <nav className="flex gap-4 text-sm font-medium text-gray-600">
              <Link to="/" className="hover:text-blue-600">
                Map
              </Link>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<MapPage />} />
        </Routes>
      </div>
    </BrowserRouter>
>>>>>>> 493eb1d48a930f755b8b0805aa321d5124b07b52
  );
}

export default App;