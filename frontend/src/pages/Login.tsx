import {
    FormEvent,
    useEffect,
    useState,
} from "react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

/*
========================================================

Login Page

Responsibilities

✔ Allow users to log in
✔ Redirect authenticated users
✔ Preserve intended destination
✔ Keep authentication logic inside useAuthStore

========================================================
*/

function Login() {

    const navigate = useNavigate();

    const location = useLocation();

    const login = useAuthStore((state) => state.login);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const loading = useAuthStore((state) => state.loading);

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    /*
    ----------------------------------------------------
    Redirect authenticated users.
    ----------------------------------------------------
    */

    useEffect(() => {

        if (!isAuthenticated) {
            return;
        }

        const destination =
            (location.state as {
                from?: string;
            })?.from ?? "/home";

        navigate(destination, {
            replace: true,
        });

    }, [
        isAuthenticated,
        navigate,
        location.state,
    ]);

    /*
    ----------------------------------------------------
    Login
    ----------------------------------------------------
    */

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        setError("");

        const user =
            await login(
                email.trim(),
                password
            );

        if (!user) {

            setError(
                "Invalid email or password."
            );

        }

    }

    return (

        <main
            style={{
                maxWidth: "420px",
                margin: "60px auto",
                padding: "32px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                background: "#ffffff",
            }}
        >

            <h1>Login</h1>

            <p>
                Sign in to continue.
            </p>

            <form
                onSubmit={handleSubmit}
            >

                <div
                    style={{
                        marginBottom: "20px",
                    }}
                >

                    <label>

                        Email

                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(
                                event.target.value
                            )
                        }
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                        }}
                    />

                </div>

                <div
                    style={{
                        marginBottom: "20px",
                    }}
                >

                    <label>

                        Password

                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                        }}
                    />

                </div>

                {error && (

                    <p
                        style={{
                            color: "red",
                            marginBottom: "18px",
                        }}
                    >
                        {error}
                    </p>

                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        cursor: "pointer",
                    }}
                >

                    {loading
                        ? "Signing in..."
                        : "Login"}

                </button>

            </form>

        </main>

    );

}

export default Login;