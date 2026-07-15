import { db } from "../config/firebase.js";
import SuggestedService from "../models/SuggestedService.js";
import { Timestamp } from "firebase-admin/firestore";

export const createSuggestion = async (req, res) => {
    try {
        const {serviceName,category,description,coordinates} = req.body;

        // Required field validation
        if (!serviceName ||!category ||!description ||!coordinates ||coordinates.latitude === undefined ||coordinates.longitude === undefined)
        {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided."
            });
        }

        const { latitude, longitude } = coordinates;

        // Coordinate validation
        if (typeof latitude !== "number" ||typeof longitude !== "number" ||latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid coordinates."
            });
        }

        // Authenticated user
        const userId = req.user.user_id;
        const userEmail = req.user.email;

        // Create model
        const suggestion = new SuggestedService({
            serviceName,
            category,
            description,
            latitude,
            longitude,
            userId,
            userEmail
        });

        // Save to Firestore
        const docRef = await db.collection("services").add({
            ...suggestion,
            createdAt: Timestamp.now()
        });

        return res.status(201).json({
            success: true,
            message: "Suggestion submitted successfully.",
            documentId: docRef.id
        });

    } catch (error) {
        console.error("Create suggestion error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to save suggestion.",
            error: error.message
        });
    }
};