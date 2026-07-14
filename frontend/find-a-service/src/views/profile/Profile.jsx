import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const styles = {
  page: {
    maxWidth: 640,
    margin: "0 auto",
    padding: "32px 24px",
    textAlign: "left",
    color: "var(--ink)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    background: "var(--amber)",
    color: "var(--ink)",
    fontSize: "1.25rem",
  },
  headerName: {
    margin: 0,
  },
  headerEmail: {
    margin: "4px 0 24px",
    color: "var(--muted)",
  },
  tabs: {
    display: "flex",
    gap: 8,
    borderBottom: "1px solid var(--line)",
    marginBottom: 24,
  },
  tabContent: {},
};

const tabStyle = ({ isActive }) => ({
  padding: "10px 4px",
  textDecoration: "none",
  color: isActive ? "var(--teal-dark)" : "var(--muted)",
  fontWeight: 600,
  fontSize: "0.9rem",
  borderBottom: isActive
    ? "2px solid var(--teal)"
    : "2px solid transparent",
  marginRight: 20,
});

function Profile() {
  const { currentUser } = useAuth();

  // Guard: no session, no dashboard.
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const firstName = currentUser?.displayName
    ? currentUser.displayName.split(" ")[0]
    : "";

  return (
    <section style={styles.page}>
      <header style={styles.header}>
        <span style={styles.avatar} aria-hidden="true">
          {/* Avatar placeholder */}
        </span>

        <div>
          <h1 style={styles.headerName}>{firstName}</h1>
          <p style={styles.headerEmail}>{currentUser?.email}</p>
        </div>
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