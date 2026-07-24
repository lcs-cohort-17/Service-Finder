import { fetchAndStoreServicesFromOverpass } from "../services/overpassService.js";

/**
 * POST /api/services/overpass/import
 * Body: { centerLat:number, centerLng:number, radiusMeters?:number }
 */
export const importFromOverpass = async (req, res) => {
  try {
    const { centerLat, centerLng, radiusMeters = 5000 } = req.body ?? {};

    if (centerLat === undefined || centerLng === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required body fields: centerLat, centerLng",
      });
    }

    const result = await fetchAndStoreServicesFromOverpass({
      centerLat: Number(centerLat),
      centerLng: Number(centerLng),
      radiusMeters: Number(radiusMeters),
    });

    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error("Overpass import failed:", error);
    return res.status(500).json({
      success: false,
      message: "Overpass import failed",
      error: error?.message,
    });
  }
};

