import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, Link } from "react-router-dom";
import Login from "./views/Login";
import MapPage from "./views/MapPage";
import Dashboard from "./views/Dashboard";
import Settings from "./views/Settings";
import Users from "./views/Users";
import DirectionsPage from "./features/directions/DirectionsPage";
// import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/useAuthStore";
import "./index.css";

function App() {
  const { user, loading, initAuthListener } = useAuthStore();

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
              <Link to="/directions" className="hover:text-blue-600">
                Directions
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
          <Route path="/directions" element={<DirectionsPage />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" replace /> : <Login />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<MapPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
