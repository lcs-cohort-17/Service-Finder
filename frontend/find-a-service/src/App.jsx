import "./App.css";

import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./views/Home";
import Login from "./views/Login";
import SuggestService from "./views/SuggestService";

function App() {
  return (
    <Routes>

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/home" replace />}
      />

      {/* Public Routes */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/home"
        element={<Home />}
      />

      {/* Protected Route */}
      <Route
        path="/suggest-service"
        element={
          <ProtectedRoute>
            <SuggestService />
          </ProtectedRoute>
        }
      />

      {/* Catch All */}
      <Route
        path="*"
        element={<Navigate to="/home" replace />}
      />

    </Routes>
  );
}

export default App;