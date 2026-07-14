import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export default function Settings() {
  const [travelMode, setTravelMode] = useState("walking");
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [voiceGuidance, setVoiceGuidance] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="settings-tab">
      <div className="settings-row">
        <label htmlFor="travel-mode">Default travel mode</label>
        <select
          id="travel-mode"
          value={travelMode}
          onChange={(e) => setTravelMode(e.target.value)}
        >
          <option value="walking">Walking</option>
          <option value="cycling">Cycling</option>
          <option value="driving">Driving</option>
        </select>
      </div>

      <div className="settings-row">
        <label htmlFor="weather-alerts">Show weather alerts</label>
        <input
          id="weather-alerts"
          type="checkbox"
          checked={weatherAlerts}
          onChange={(e) => setWeatherAlerts(e.target.checked)}
        />
      </div>

      <div className="settings-row">
        <label htmlFor="voice-guidance">Voice guidance by default</label>
        <input
          id="voice-guidance"
          type="checkbox"
          checked={voiceGuidance}
          onChange={(e) => setVoiceGuidance(e.target.checked)}
        />
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}