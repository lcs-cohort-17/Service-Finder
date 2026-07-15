import { seedFromOverpassDb, updateServiceStatusDb } from "../models/serviceModel.js";
import {
    getApprovedServices,
    subscribeToApprovedServices,
} from "../models/serviceModel.js";


const mapServiceType = (tags) => {
  // 1. Check amenities first
  const amenity = tags.amenity || '';

  // Hospitals & Clinics
  if (['hospital'].includes(amenity)) return 'hospital';
  if (['clinic', 'doctors', 'dentist'].includes(amenity)) return 'clinic';

  // Libraries
  if (['library'].includes(amenity)) return 'library';

  // Shelters
  if (['shelter'].includes(amenity)) return 'shelter';

  // Police
  if (['police'].includes(amenity)) return 'police';

  // Taxi ranks
  if (['taxi'].includes(amenity)) return 'taxi';

  // Schools (keep your existing logic)
  if (['school', 'kindergarten', 'college', 'university'].includes(amenity)) return 'school';

  // Bus station (amenity)
  if (['bus_station'].includes(amenity)) return 'bus_stop';

  // 2. Check highway tags (for bus stops)
  const highway = tags.highway || '';
  if (highway === 'bus_stop') return 'bus_stop';

  // 3. Check railway tags (for train stations)
  const railway = tags.railway || '';
  if (['station', 'halt'].includes(railway)) return 'train_station';

  // 4. Fallback for unknown types
  return 'other';
};

export const seedFromOverpassCon = async (req, res, next) => {
  try {
    // Cape Town bounding box (you can keep or expand this)
    const bbox = '-34.05,18.35,-33.85,18.60'; 

    // Expanded query — covers ALL services from your screenshot
    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["amenity"~"hospital|clinic|doctors|dentist|library|shelter|police|taxi|bus_station|school|kindergarten|college|university"](${bbox});
        way["amenity"~"hospital|clinic|doctors|dentist|library|shelter|police|taxi|bus_station|school|kindergarten|college|university"](${bbox});

        node["highway"="bus_stop"](${bbox});
        way["highway"="bus_stop"](${bbox});

        node["railway"~"station|halt"](${bbox});
        way["railway"~"station|halt"](${bbox});
      );
      out center;
    `;

    // Remove extra whitespace for clean URL encoding
    const cleanedQuery = overpassQuery.replace(/\s+/g, ' ').trim();
    const response = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(cleanedQuery)}`,
      { headers: { 'User-Agent': 'FirebaseSeederScript/1.0 (contact: pearsongazelle@gmail.com)' } }
    );

    if (!response.ok) {
      throw new Error(`Overpass API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const elements = data.elements || [];

    if (elements.length === 0) {
      return res.status(200).json({ message: "No services found in this area." });
    }

    // Format the data (note: we now pass the entire 'tags' object to mapServiceType)
    const formattedServices = [];
    for (const element of elements) {
      const lat = element.lat || (element.center && element.center.lat);
      const lon = element.lon || (element.center && element.center.lon);
      const tags = element.tags || {};
      const name = tags.name || `Unnamed ${tags.amenity || tags.highway || tags.railway || 'service'}`;

      if (!lat || !lon) continue;

      // Use the NEW mapping function
      const serviceType = mapServiceType(tags);

      // Skip 'other' types if you only want the specific categories (optional)
      // if (serviceType === 'other') continue; 

      formattedServices.push({
        id: `osm_${element.id}`,
        name: name,
        category: serviceType, // Now returns: clinic, hospital, school, library, shelter, police, taxi, bus_stop, train_station, or other
        coordinates: {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon)
        },
        address: tags['addr:street']
          ? `${tags['addr:housenumber'] || ''} ${tags['addr:street']}`.trim()
          : 'Address not available',
        status: 'approved',
        source: 'overpass',
        createdAt: new Date().toISOString(),
        submittedBy: 'system'
      });
    }

    // Save to Firestore (using your existing seedFromOverpassDb function)
    const savedCount = await seedFromOverpassDb(formattedServices);

    res.status(200).json({
      success: true,
      message: `Successfully seeded Firestore with ${savedCount} services from Overpass.`,
    });

  } catch (error) {
    next(error);
  }
};

export const moderateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'declined'].includes(status)) {
      return res.status(400).json({ error: "Status must be 'approved' or 'declined'." });
    }

    const updated = await updateServiceStatusDb(id, status, new Date().toISOString());

    res.status(200).json({
      success: true,
      message: `Service status updated to ${status}.`,
      data: updated
    });
  } catch (error) {
    if (error.code === "NOT_FOUND") {
      return res.status(404).json({ error: "Service not found." });
    }
    next(error);
  }
};


/**
 * GET /api/services
 * Returns approved services within the current map bounds.
 */
export const fetchApprovedServices = async (req, res) => {
    try {
        const {
            minLat,
            maxLat,
            minLng,
            maxLng,
        } = req.query;

        // Validate required query parameters
        if (
            minLat === undefined ||
            maxLat === undefined ||
            minLng === undefined ||
            maxLng === undefined
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Missing required query parameters: minLat, maxLat, minLng, maxLng.",
            });
        }

        const services = await getApprovedServices({
            minLat: Number(minLat),
            maxLat: Number(maxLat),
            minLng: Number(minLng),
            maxLng: Number(maxLng),
        });

        return res.status(200).json({
            success: true,
            count: services.length,
            data: services,
        });
    } catch (error) {
        console.error("Error fetching approved services:", error);

        const quotaExceeded =
            error.code === 8 ||
            error.message?.includes("RESOURCE_EXHAUSTED") ||
            error.message?.includes("Quota exceeded");

        return res.status(quotaExceeded ? 429 : 500).json({
            success: false,
            message: quotaExceeded
                ? "Firestore quota exceeded."
                : "Failed to fetch approved services.",
            error: error.message,
        });
    }
};

/**
 * GET /api/services/stream
 * Server Sent Events endpoint
 */
export const streamApprovedServices = (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.flushHeaders?.();

    const unsubscribe = subscribeToApprovedServices((services) => {
        res.write(
            `data: ${JSON.stringify({
                success: true,
                count: services.length,
                data: services,
            })}\n\n`
        );
    });

    req.on("close", () => {
        unsubscribe();
        res.end();
    });
};
