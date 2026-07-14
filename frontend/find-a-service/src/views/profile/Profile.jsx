import { NavLink, Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const styles = {
  page: {
    maxWidth: 640,
    margin: "0 auto",
    padding: "32px 24px",
    textAlign: "left",
  },
  headerName: {
    margin: 0,
  },
  headerEmail: {
    margin: "4px 0 24px",
    color: "#666",
  },
  tabs: {
    display: "flex",
    gap: 8,
    borderBottom: "1px solid #eee",
    marginBottom: 24,
  },
  tabContent: {},
};

const tabStyle = ({ isActive }) => ({
  padding: "10px 4px",
  textDecoration: "none",
  color: isActive ? "#1a1a1a" : "#888",
  fontWeight: 600,
  fontSize: "0.9rem",
  borderBottom: isActive ? "2px solid #1a1a1a" : "2px solid transparent",
  marginRight: 20,
});

function Profile() {
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isLoading = useAuthStore((state) => state.isLoading);

  // Wait for Firebase to resolve the initial auth state (relevant on a
  // hard refresh) before deciding whether to redirect.
  if (isLoading) {
    return null;
  }

  // Guard: no session, no dashboard.
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const firstName = user?.name ? user.name.split(" ")[0] : "";

  return (
    <section style={styles.page}>
      <header>
        <h1 style={styles.headerName}>{firstName}</h1>
        <p style={styles.headerEmail}>{user?.email}</p>
      </header>

      <nav style={styles.tabs}>
        <NavLink to="/profile" end style={tabStyle}>
          Overview
        </NavLink>
        <NavLink to="/profile/saved-routes" style={tabStyle}>
          Saved routes
        </NavLink>
        <NavLink to="/profile/report-history" style={tabStyle}>
          Report history
        </NavLink>
        <NavLink to="/profile/settings" style={tabStyle}>
          Settings
        </NavLink>
      </nav>

      <div style={styles.tabContent}>
        <Outlet />
      </div>
    </section>
  );
}

export default Profile;