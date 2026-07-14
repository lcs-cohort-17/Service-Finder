import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    background: "var(--ink)",
    borderBottom: "1px solid var(--teal-dark)",
  },
  brand: {
    fontWeight: 700,
    textDecoration: "none",
    color: "#fff",
  },
  signInBtn: {
    padding: "8px 18px",
    borderRadius: "var(--radius)",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    background: "var(--teal)",
    color: "#fff",
  },
  userBtn: {
    padding: "8px 18px",
    borderRadius: "var(--radius)",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    background: "var(--amber)",
    color: "var(--ink)",
  },
};

function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Ticket asks for the user's first name specifically.
  const firstName = currentUser?.displayName
    ? currentUser.displayName.split(" ")[0]
    : "";

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.brand}>
        find-a-service
      </Link>

      <div>
        {currentUser ? (
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