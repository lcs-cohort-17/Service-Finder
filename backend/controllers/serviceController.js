import { getApprovedServices } from "../models/serviceModel.js";

/**
 * GET /api/services
 * Returns all approved services.
 */
export const fetchApprovedServices = async (req, res) => {
    try {
        const services = await getApprovedServices();

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
                ? "Firestore quota exceeded. Try again after the quota resets, reduce reads, or upgrade billing."
                : "Failed to fetch approved services.",
            error: error.message,
        });
    }
};
