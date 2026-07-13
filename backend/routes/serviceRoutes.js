// write endpoints for services
import express from "express";
import { createSuggestion } from "../controllers/suggestionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/suggestions
router.post("/", authMiddleware, createSuggestion);

export default router;