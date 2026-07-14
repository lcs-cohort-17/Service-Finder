// backend/routes/serviceRoutes.js
// API Routes for services

import express from 'express';
import { moderateService, seedFromOverpassCon } from '../controllers/serviceController.js';

const router = express.Router();

// POST /api/services/seed - Import from Overpass
router.post('/seed', seedFromOverpassCon);
router.patch('/moderate/:id', moderateService);

export default router;