// backend/controllers/directionsController.js

// routing.openstreetmap.de runs THREE separate OSRM servers, one per profile.
// Unlike router.project-osrm.org (which often ignores the profile in the URL
// and always returns driving results), this one actually differentiates —
// the differentiation happens via the subdomain prefix (routed-car /
// routed-bike / routed-foot), not the URL path segment, which always stays
// "driving" regardless of profile.
const OSRM_SERVERS = {
  driving: "https://routing.openstreetmap.de/routed-car",
  walking: "https://routing.openstreetmap.de/routed-foot",
  cycling: "https://routing.openstreetmap.de/routed-bike",
};

function isValidCoordinate(point) {
  if (!point || typeof point !== "object") return false;
  const { lat, lng } = point;
  return (
    typeof lat === "number" &&
    typeof lng === "number" &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

function validateRouteRequest(body) {
  const { origin, destination, mode } = body || {};

  if (!isValidCoordinate(origin)) {
    return "Invalid or missing 'origin'. Expected { lat: number, lng: number }.";
  }
  if (!isValidCoordinate(destination)) {
    return "Invalid or missing 'destination'. Expected { lat: number, lng: number }.";
  }
  if (!mode || !OSRM_SERVERS[mode]) {
    return `Invalid or missing 'mode'. Expected one of: ${Object.keys(OSRM_SERVERS).join(", ")}.`;
  }

  return null; // no errors
}

// Flattens OSRM's turn-by-turn steps into a simple instruction list
function extractInstructions(route) {
  const instructions = [];

  for (const leg of route.legs || []) {
    for (const step of leg.steps || []) {
      const maneuver = step.maneuver || {};
      instructions.push({
        instruction: `${maneuver.type || "continue"}${
          maneuver.modifier ? ` (${maneuver.modifier})` : ""
        } onto ${step.name || "unnamed road"}`,
        distance: step.distance, // meters
        duration: step.duration, // seconds
      });
    }
  }

  return instructions;
}

async function calculateRoute(req, res) {
  const validationError = validateRouteRequest(req.body);
  if (validationError) {
    return res.status(400).json({ status: "error", message: validationError });
  }

  const { origin, destination, mode } = req.body;
  const server = OSRM_SERVERS[mode];

  const coordString = `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;
  // Note: the "driving" in this path is a fixed OSRM API segment name, not
  // related to our transport mode — the actual profile is chosen by which
  // server (routed-car/routed-bike/routed-foot) we send the request to.
  const url = `${server}/route/v1/driving/${coordString}?overview=full&geometries=geojson&steps=true`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(502).json({
        status: "error",
        message: "Routing service is currently unavailable. Please try again later.",
      });
    }

    const data = await response.json();

    if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No route could be found between the given locations.",
      });
    }

    const route = data.routes[0];

    return res.status(200).json({
      status: "ok",
      distance: route.distance, // meters
      duration: route.duration, // seconds
      polyline: route.geometry.coordinates, // array of [lng, lat] pairs
      instructions: extractInstructions(route),
    });
  } catch (err) {
    console.error("Directions API error:", err.message);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong while calculating the route.",
    });
  }
}

export { calculateRoute };