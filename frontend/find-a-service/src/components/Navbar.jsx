import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: "1px solid #eee",
  },
  brand: {
    fontWeight: 700,
    textDecoration: "none",
    color: "inherit",
  },
  signInBtn: {
    padding: "8px 18px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    background: "#1a1a1a",
    color: "#fff",
  },
  userBtn: {
    padding: "8px 18px",
    borderRadius: 999,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    background: "#f0f0f0",
    color: "#1a1a1a",
  },
};

function Navbar() {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  // Ticket asks for the user's first name specifically.
  const firstName = user?.name ? user.name.split(" ")[0] : "";

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.brand}>
        find-a-service
      </Link>

      <div>
        {isLoggedIn ? (
          <button
            type="button"
            style={styles.userBtn}
            onClick={() => navigate("/profile")}
          >
            {firstName}
          </button>
        ) : (
          <button
            type="button"
            style={styles.signInBtn}
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;