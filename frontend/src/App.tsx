import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, Link } from "react-router-dom";
import Login from "./views/Login";
import MapPage from "./views/MapPage";
import Dashboard from "./views/Dashboard";
import Settings from "./views/Settings";
import Users from "./views/Users";
// TODO: confirm this path — ProtectedRoute was used in the original file but never imported
//import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/useAuthStore";
import "./index.css";
import React from 'react';
import Map from './components/map/Map';
import type { MapMarker } from './types/map.types';

function App() {
  const { user, loading, initAuthListener } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsubscribe = initAuthListener();
    return () => unsubscribe?.();
  }, [initAuthListener]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
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
          {/* Public routes */}
          <Route path="/" element={<MapPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" replace /> : <Login />}
          />

          {/* Protected routes */}
          {/* <Route element={<ProtectedRoute />}> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          {/* </Route> */}

          {/* Single catch-all — was duplicated in the conflict */}
          <Route path="*" element={<MapPage />} />
        </Routes>
      </div>
    </BrowserRouter>
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
