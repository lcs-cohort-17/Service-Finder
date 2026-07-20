import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../features/auth/hooks/useAuth";

/*
========================================================

Home Page

Responsibilities

✔ Display authentication state
✔ Navigate users through the app
✔ Allow login/logout
✔ Keep UI independent from authentication implementation

========================================================
*/

function Home() {

    const navigate = useNavigate();

    const {
        user,
        logout,
        isAuthenticated,
    } = useAuth();

    function handleLogout() {

        logout();

        navigate("/login");

    }

    return (

        <main
            style={{
                maxWidth: "900px",
                margin: "50px auto",
                padding: "24px",
            }}
        >

            <h1>Service Finder</h1>

            <p>
                Find nearby public services quickly and easily.
            </p>

            <hr
                style={{
                    margin: "24px 0",
                }}
            />

            {isAuthenticated ? (

                <>

                    <h2>
                        Welcome
                    </h2>

                    <p>

                        Signed in as

                        <strong>
                            {" "}
                            {user?.email}
                        </strong>

                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            marginTop: "20px",
                            flexWrap: "wrap",
                        }}
                    >

                        <Link
                            to="/suggest-service"
                        >
                            <button>
                                Suggest Service
                            </button>
                        </Link>

                        <button
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </>

            ) : (

                <>

                    <h2>
                        You are not logged in.
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            marginTop: "20px",
                            flexWrap: "wrap",
                        }}
                    >

                        <Link
                            to="/login"
                        >
                            <button>
                                Login
                            </button>
                        </Link>

                    </div>

                </>

            )}

        </main>

    );

}

export default Home;