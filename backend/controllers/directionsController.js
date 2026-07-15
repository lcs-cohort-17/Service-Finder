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

// Structured exception logging — one consistent shape for every routing
// failure, so logs are easy to search/filter regardless of failure type.
function logRoutingException({ type, mode, message, detail }) {
  console.error(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      context: "directions.calculateRoute",
      type, // "validation" | "timeout" | "upstream_error" | "not_found" | "unexpected"
      mode: mode || null,
      message,
      detail: detail || null,
    })
  );
}

// Every error response follows this exact shape, so the frontend can rely
// on { status, error: { code, message } } no matter what failed.
function sendError(res, httpStatus, code, message) {
  return res.status(httpStatus).json({
    status: "error",
    error: { code, message },
  });
}

async function calculateRoute(req, res) {
  const validationError = validateRouteRequest(req.body);
  if (validationError) {
    logRoutingException({
      type: "validation",
      mode: req.body?.mode,
      message: validationError,
    });
    return sendError(res, 400, "INVALID_REQUEST", validationError);
  }

  const { origin, destination, mode } = req.body;
  const server = OSRM_SERVERS[mode];

  const coordString = `${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;
  // Note: the "driving" in this path is a fixed OSRM API segment name, not
  // related to our transport mode — the actual profile is chosen by which
  // server (routed-car/routed-bike/routed-foot) we send the request to.
  const url = `${server}/route/v1/driving/${coordString}?overview=full&geometries=geojson&steps=true`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      logRoutingException({
        type: "upstream_error",
        mode,
        message: `Routing service responded with HTTP ${response.status}`,
      });
      return sendError(
        res,
        502,
        "ROUTING_SERVICE_UNAVAILABLE",
        "Routing service is currently unavailable. Please try again later."
      );
    }

    const data = await response.json();

    if (data.code !== "Ok" || !data.routes || data.routes.length === 0) {
      logRoutingException({
        type: "not_found",
        mode,
        message: "No route found for given coordinates",
        detail: data.code,
      });
      return sendError(
        res,
        404,
        "ROUTE_NOT_FOUND",
        "No route could be found between the given locations."
      );
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
    clearTimeout(timeoutId);

    if (err.name === "AbortError") {
      logRoutingException({
        type: "timeout",
        mode,
        message: `Routing request exceeded ${REQUEST_TIMEOUT_MS}ms`,
      });
      return sendError(
        res,
        504,
        "ROUTING_TIMEOUT",
        "The routing service took too long to respond. Please try again."
      );
    }

    logRoutingException({
      type: "unexpected",
      mode,
      message: err.message,
    });
    return sendError(
      res,
      500,
      "INTERNAL_ERROR",
      "Something went wrong while calculating the route."
    );
  }
}

export { calculateRoute };