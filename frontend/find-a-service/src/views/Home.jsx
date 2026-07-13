import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

function Home() {
  const user = useAuthStore((state) => state.user);

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Service Finder</h1>

      <p>
        Welcome to the Service Finder application.
      </p>

      <hr />

      {isAuthenticated ? (
        <>
          <h3>Logged In</h3>

          <p>
            <strong>Name:</strong>{" "}
            {user?.displayName}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <Link to="/suggest-service">
              <button>
                Suggest Service
              </button>
            </Link>

            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>Guest User</h3>

          <p>
            You are currently not logged in.
          </p>

          <div
            style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
        }}
    >
      <Link to="/suggest-service">
        <button>
          Suggest Service
        </button>
      </Link>

          <Link to="/login">
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