import {
    getApprovedServices,
    subscribeToApprovedServices,
} from "../models/serviceModel.js";

/***
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