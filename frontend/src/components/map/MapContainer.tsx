// import { useEffect, useState } from "react";

// /**
//  * Placeholder for MAP-001 (map integration isn't built yet).
//  *
//  * Kept intentionally simple: it "loads" map data on mount, so
//  * MapErrorBoundary's retry (which remounts this component) has real
//  * data-fetching behavior to re-run, not just a static render.
//  *
//  * QA/testing tip: append ?debug=map-error to the URL to force this
//  * component to throw, so you can verify MapErrorBoundary's fallback UI
//  * and retry button without needing a real map failure. Remove the
//  * debug check once MAP-001 lands with real error paths.
//  */
// export default function MapContainer() {
//   const [status, setStatus] = useState<"loading" | "ready">("loading");

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     if (params.get("debug") === "map-error") {
//       throw new Error("Network request to map service failed");
//     }

//     const timeout = setTimeout(() => setStatus("ready"), 300);
//     return () => clearTimeout(timeout);
//   }, []);

//   if (status === "loading") {
//     return (
//       <div className="flex min-h-[320px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
//         Loading map…
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-[320px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-sm text-slate-500">
//       Map goes here (MAP-001)
//     </div>
//   );
// }


import { useEffect, useState } from "react";

/**
 * Placeholder for MAP-001 (map integration isn't built yet).
 *
 * Kept intentionally simple: it "loads" map data on mount, so
 * MapErrorBoundary's retry (which remounts this component) has real
 * data-fetching behavior to re-run, not just a static render.
 *
 * QA/testing tip: click "Simulate map error" below (dev only) to force
 * this component to throw, so you can verify MapErrorBoundary's fallback
 * UI and retry button without needing a real map failure. You can also
 * append ?debug=map-error to the URL to trigger it on load.
 * Remove this once MAP-001 lands with real error paths.
 */
export default function MapContainer() {
  const [status, setStatus] = useState<"loading" | "ready">("loading");
  const [forceError, setForceError] = useState(false);

  useEffect(() => {
    if (forceError) {
      throw new Error("Network request to map service failed");
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "map-error") {
      throw new Error("Network request to map service failed");
    }

    const timeout = setTimeout(() => setStatus("ready"), 300);
    return () => clearTimeout(timeout);
  }, [forceError]);

  if (status === "loading") {
    return (
      <div className="flex min-h-[320px] w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-500">
        Loading map…
      </div>
    );
  }

  return (
    <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 text-sm text-slate-500">
      Map goes here (MAP-001)
      {import.meta.env.DEV && (
        <button
          type="button"
          onClick={() => setForceError(true)}
          className="rounded-lg bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
        >
          Simulate map error (dev only)
        </button>
      )}
    </div>
  );
}