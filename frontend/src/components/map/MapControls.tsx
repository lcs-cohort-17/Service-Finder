import { useCallback, useState } from "react";
import { useMap } from "react-leaflet";

/**
 * Small "locate me" control rendered in the bottom-right corner of the
 * map, alongside Leaflet's default zoom control (top-right).
 */
export function MapControls() {
  const map = useMap();
  const [locating, setLocating] = useState(false);

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.flyTo([latitude, longitude], 15, { duration: 1 });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }, [map]);

  return (
    <div className="absolute bottom-4 right-4 z-[400]">
      <button
        type="button"
        onClick={handleLocate}
        disabled={locating}
        aria-label="Centre map on my location"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-md ring-1 ring-slate-200 transition hover:text-slate-900 disabled:opacity-60"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={`h-5 w-5 ${locating ? "animate-pulse" : ""}`}
        >
          <circle cx="12" cy="12" r="3" />
          <path
            strokeLinecap="round"
            d="M12 2v3M12 19v3M2 12h3M19 12h3"
          />
        </svg>
      </button>
    </div>
  );
}
