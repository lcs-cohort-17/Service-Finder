import express from "express";
import { validateSubmission } from "../middleware/validateServices.js";
import { fetchApprovedServices, getApprovedCurrentUserSuggestedServices, getDeclinedCurrentUserSuggestedServices, getDeclinedServices, getPendingCurrentUserSuggestedServices, getPendingServices, moderateService, seedFromOverpassCon, streamApprovedServices, submitService } from "../controllers/serviceController.js";
import { requireRole, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
// Public map data: visitors may browse approved services without logging in.
router.get("/approved", fetchApprovedServices);
router.get('/declined', verifyToken, requireRole(['admin']), getDeclinedServices);
router.get('/pending', verifyToken, requireRole(['admin']), getPendingServices);
router.post('/suggest', verifyToken, requireRole(['user', 'admin']), validateSubmission, submitService);
router.get('/suggested/declined', verifyToken, requireRole(['user', 'admin']), getDeclinedCurrentUserSuggestedServices);
router.get("/suggested/approved", verifyToken, requireRole(['user', 'admin']), getApprovedCurrentUserSuggestedServices);
router.get('/suggested/pending', verifyToken, requireRole(['user', 'admin']), getPendingCurrentUserSuggestedServices);
router.get("/approved/stream", streamApprovedServices);
router.post('/seed', verifyToken, requireRole(['admin']), seedFromOverpassCon);
router.patch('/moderate/:id', verifyToken, requireRole(['admin']), moderateService);
export default router
