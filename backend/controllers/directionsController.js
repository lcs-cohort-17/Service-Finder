// backend/controllers/directionsController.js
import AppError from "../utils/AppError.js";

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

const REQUEST_TIMEOUT_MS = 8000;

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

// Express 5 automatically forwards rejected promises from async route
// handlers to the centralized error-handling middleware (errorHandler.js),
// so this controller just throws AppError — no res.status()/res.json()
// calls for error cases live here anymore. That's the "centralized" part
// of Directions-006's requirement.
async function calculateRoute(req, res) {
  const validationError = validateRouteRequest(req.body);
  if (validationError) {
    throw new AppError(400, "INVALID_REQUEST", validationError);
  }

  const { origin, destination, mode } = req.body;
  const server = OSRM_SERVERS[mode];

  const coordString = `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;
  const url = `${server}/route/v1/driving/${coordString}?overview=full&geometries=geojson&steps=true`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(url, { signal: controller.signal });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new AppError(
        504,
        "ROUTING_TIMEOUT",
        "The routing service took too long to respond. Please try again."
      );
    }
    throw new AppError(500, "INTERNAL_ERROR", "Something went wrong while calculating the route.");
  }
  clearTimeout(timeoutId);

  if (!response.ok) {
    throw new AppError(
      502,
      "ROUTING_SERVICE_UNAVAILABLE",
      "Routing service is currently unavailable. Please try again later."
    );
  }

  const data = await response.json();

  if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
    throw new AppError(
      404,
      "ROUTE_NOT_FOUND",
      "No route could be found between the given locations."
    );
  }

  const route = data.routes[0];

  res.status(200).json({
    status: "ok",
    distance: route.distance,
    duration: route.duration,
    polyline: route.geometry.coordinates,
    instructions: extractInstructions(route),
  });
}

export { calculateRoute };
