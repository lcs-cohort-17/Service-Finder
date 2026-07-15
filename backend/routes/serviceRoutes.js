// backend/routes/serviceRoutes.js
// API Routes for services
import express from "express";

import {
    fetchApprovedServices,
    streamApprovedServices,
} from "../controllers/serviceController.js";

import { moderateService, seedFromOverpassCon } from '../controllers/serviceController.js';

const router = express.Router();

// POST /api/services/seed - Import from Overpass
router.post('/seed', seedFromOverpassCon);
router.patch('/moderate/:id', moderateService);

const router = express.Router();

router.get("/", fetchApprovedServices);

router.get("/stream", streamApprovedServices);

export default router;