import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import { AuthProvider } from "../features/auth/context/AuthContext";

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
✔ Provide authentication context
✔ BrowserRouter is provided by main.tsx

========================================================
*/

function AppRouter() {

    return (

        <AuthProvider>

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

        </AuthProvider>

    );

}

export default AppRouter;