import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    maxWidth: 360,
  },
  label: {
    fontSize: "0.85rem",
    fontWeight: 600,
    marginTop: 10,
    color: "var(--charcoal)",
  },
  input: {
    padding: "10px 12px",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius)",
    fontSize: "1rem",
  },
  savedMsg: {
    color: "#2E7D32",
    fontSize: "0.85rem",
    marginTop: 8,
  },
};

function Overview() {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || "");

  // Mock data for now — no "home area" field exists on the Firebase user
  // object yet, so this is local state until a real user-profile backend
  // is wired up.
  const [homeArea, setHomeArea] = useState("");

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();

    // TODO: persist to backend once a user-profile data store exists.
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form style={styles.form} onSubmit={handleSave}>
      <label htmlFor="name" style={styles.label}>
        Name
      </label>
      <input
        id="name"
        type="text"
        style={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="home-area" style={styles.label}>
        Home area
      </label>
      <input
        id="home-area"
        type="text"
        style={styles.input}
        placeholder="e.g. Umhlanga, Durban"
        value={homeArea}
        onChange={(e) => setHomeArea(e.target.value)}
      />

      <button type="submit" className="save-settings-btn">
        Save changes
      </button>

      {saved && <span style={styles.savedMsg}>Saved.</span>}
    </form>
  );
}

export default Overview;