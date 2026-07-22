import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

/*
========================================================

Suggest Service Page

Responsibilities

✔ Protected page

✔ Display authenticated user

✔ Demonstrate protected navigation

Future tickets (FIRESTORE-001)

This page will eventually contain the full
service suggestion form.

========================================================
*/

function SuggestService() {

    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);

    return (

        <main
            style={{
                maxWidth: "900px",
                margin: "50px auto",
                padding: "24px",
            }}
        >

            <h1>
                Suggest a Service
            </h1>

            <p>

                This page is protected by
                <strong> AUTH-005.</strong>

            </p>

            <hr
                style={{
                    margin: "24px 0",
                }}
            />

            <section
                style={{
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    background: "#fafafa",
                }}
            >

                <h2>
                    Logged-in User
                </h2>

                <p>

                    <strong>Email:</strong>{" "}

                    {user?.email}

                </p>

                <p>

                    Only authenticated users
                    can access this page.

                </p>

            </section>

            <div
                style={{
                    marginTop: "30px",
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                }}
            >

                <button
                    onClick={() =>
                        navigate("/home")
                    }
                >
                    Back to Home
                </button>

            </div>

        </main>

    );

}

export default SuggestService;