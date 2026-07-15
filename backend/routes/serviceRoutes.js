// write endpoints for services
import express from "express";
import { getDeclinedServices, getPendingServices, submitService, getApprovedServices } from "../controllers/serviceController.js";
import { requireRole, verifyToken } from "../middleware/authMiddleware.js";
import { validateSubmission } from "../middleware/validateService.js";
// import { createSuggestion } from "../controllers/suggestionController.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/suggestions
// router.post("/", authMiddleware, createSuggestion);
router.post('/submit', verifyToken, requireRole(['user', 'admin']), validateSubmission, submitService);
router.get('/pending', verifyToken, requireRole(['admin']), getPendingServices);
router.get('/declined', verifyToken, requireRole(['admin']), getDeclinedServices);
router.get('/approved', verifyToken, requireRole(['admin']), getApprovedServices);

export default router