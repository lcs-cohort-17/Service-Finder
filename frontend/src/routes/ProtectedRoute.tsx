import { ReactNode } from "react";

import {
    Navigate,
    useLocation,
} from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

/*
========================================================

Protected Route

Responsibilities

✔ Prevent unauthenticated users from
  accessing protected pages.

✔ Redirect users to the Login page.

✔ Preserve the original destination so the
  user can be returned there after login.

✔ Uses useAuthStore (Zustand) for auth state.

========================================================
*/

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({
    children,
}: ProtectedRouteProps) {

    const isAuthenticated =
        useAuthStore((state) => state.isAuthenticated);

    const loading =
        useAuthStore((state) => state.loading);

    const location = useLocation();

    /*
    ----------------------------------------------------
    While loading, don't redirect the user yet.
    ----------------------------------------------------
    */

    if (loading) {

        return (

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    fontSize: "18px",
                }}
            >
                Restoring session...
            </div>

        );

    }

    /*
    ----------------------------------------------------
    Not authenticated

    Redirect to Login while remembering where the user
    wanted to go.
    ----------------------------------------------------
    */

    if (!isAuthenticated) {

        return (

            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname,
                }}
            />

        );

    }

    /*
    ----------------------------------------------------
    Authenticated

    Allow access.
    ----------------------------------------------------
    */

    return children;

}

export default ProtectedRoute;