import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from "../../../store/useAuthStore";

function SettingsTab() {
  const [travelMode, setTravelMode] = useState("walking");
  const [weatherAlerts, setWeatherAlerts] = useState(true);
  const [voiceGuidance, setVoiceGuidance] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="flex max-w-sm flex-col gap-4">
      <div className="flex items-center justify-between">
        <label htmlFor="travel-mode" className="text-sm font-semibold">
          Default travel mode
        </label>
        <select
          id="travel-mode"
          value={travelMode}
          onChange={(e) => setTravelMode(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-1.5"
        >
          <option value="walking">Walking</option>
          <option value="cycling">Cycling</option>
          <option value="driving">Driving</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="weather-alerts" className="text-sm font-semibold">
          Show weather alerts
        </label>
        <input
          id="weather-alerts"
          type="checkbox"
          checked={weatherAlerts}
          onChange={(e) => setWeatherAlerts(e.target.checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="voice-guidance" className="text-sm font-semibold">
          Voice guidance by default
        </label>
        <input
          id="voice-guidance"
          type="checkbox"
          checked={voiceGuidance}
          onChange={(e) => setVoiceGuidance(e.target.checked)}
        />
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-2 w-fit rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white"
      >
        Log out
      </button>
    </div>
  );
}

export default SettingsTab;
