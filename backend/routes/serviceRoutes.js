import express from "express";
import { fetchApprovedServices } from "../controllers/serviceController.js";

const router = express.Router();

/**
 * GET /api/services
 * Fetch all approved services
 */
router.get("/", fetchApprovedServices);

export default router;