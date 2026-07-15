import { useState } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import LocationButton from "./components/LocationButton.jsx";
import TransportModeSelector from "./components/TransportModeSelector.jsx";
import useDirectionsStore from "./store/useDirectionsStore.js";

function App() {
  const { currentUser, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("driving");
  const { route, loading, error, getRoute, retry } = useDirectionsStore();

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("Login successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logged out!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Firebase Auth Test</h1>

      <LocationButton onLocationFound={(coords) => console.log("Got location:", coords)} />

      <TransportModeSelector value={mode} onChange={setMode} />

      <button
        onClick={() =>
          getRoute(
            { lat: -29.8587, lng: 31.0218 },
            { lat: -29.7864, lng: 30.9948 },
            mode
          )
        }
      >
        Test Route
      </button>

      <button
        onClick={() =>
          getRoute(
            { lat: 999, lng: 999 },
            { lat: -29.7864, lng: 30.9948 },
            mode
          )
        }
      >
        Test Invalid Coordinates
      </button>

      {loading && <p>Calculating route...</p>}

      {error && (
        <div>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={retry}>Retry</button>
        </div>
      )}

      {route && (
        <p>
          Distance: {(route.distance / 1000).toFixed(1)} km — ETA: {Math.round(route.duration / 60)} min
        </p>
      )}

      {currentUser ? (
        <>
          <p>UID: {currentUser.uid}</p>
          <p>Email: {currentUser.email}</p>
          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>Not Logged In</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /><br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />
          <button onClick={handleLogin}>
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default App;