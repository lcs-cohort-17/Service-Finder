import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, Link } from "react-router-dom";
import Login from "./views/Login";
import MapPage from './views/MapPage';
import Dashboard from "./views/Dashboard";
import Settings from "./views/Settings";
import Users from "./views/Users";
import ProtectedRoute from "./components/layout/proctectedRouter";
import { useAuthStore } from "./store/useAuthStore";
import "./index.css";


function App() {
  const initAuthListener = useAuthStore((state) => state.initAuthListener);

  useEffect(() => {
    const unsubscribe = initAuthListener();

    return () => {
      unsubscribe?.();
    };
  }, [initAuthListener]);

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
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<MapPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<MapPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
