// backend/routes/directionsRoutes.js
import express from "express";
import { calculateRoute } from "../controllers/directionsController.js";

const router = express.Router();

// POST /api/directions
// Body: { origin: { lat, lng }, destination: { lat, lng }, mode: "driving" | "walking" | "cycling" }
router.post("/", calculateRoute);

export default router;
