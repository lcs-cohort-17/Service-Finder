import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";

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
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #ccc",
    borderRadius: 8,
    fontSize: "1rem",
  },
  button: {
    marginTop: 18,
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
    background: "#1a1a1a",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    width: "fit-content",
  },
  savedMsg: {
    color: "#2e7d32",
    fontSize: "0.85rem",
    marginTop: 8,
  },
};

function Overview() {
  const user = useAuthStore((state) => state.user);
  const [name, setName] = useState(user?.name || "");
  // Mock data for now — no "home area" field exists on the Firebase user
  // object yet, so this is local state until a real user-profile backend
  // (AUTH-003 / AUTH-007) is wired up.
  const [homeArea, setHomeArea] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: persist to backend once AUTH-003 / AUTH-007 land.
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

      <button type="submit" style={styles.button}>
        Save changes
      </button>
      {saved && <span style={styles.savedMsg}>Saved.</span>}
    </form>
  );
}

export default Overview;