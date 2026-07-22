import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import SuggestService from "../pages/SuggestService";

/*
========================================================

Application Router

Responsibilities

✔ Configure application routes
✔ Protect authenticated pages
✔ Redirect unknown routes
✔ No AuthProvider needed — useAuthStore
  handles session via Zustand + localStorage.
✔ BrowserRouter is provided by main.tsx

========================================================
*/

function AppRouter() {

    return (

        <Routes>

            {/* Redirect root */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/home"
                        replace
                    />
                }
            />

            {/* Public Routes */}

            <Route
                path="/home"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            {/* Protected Routes */}

            <Route
                path="/suggest-service"
                element={

                    <ProtectedRoute>

                        <SuggestService />

                    </ProtectedRoute>

                }
            />

            {/* Catch-all */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/home"
                        replace
                    />
                }
            />

        </Routes>

    );

}

export default AppRouter;