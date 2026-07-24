import express from "express";

import { importFromOverpass } from "../controllers/overpassServiceController.js";

const router = express.Router();

router.post("/import", importFromOverpass);

export default router;

