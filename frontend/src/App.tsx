import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./views/Login";
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
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
