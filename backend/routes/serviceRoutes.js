import express from "express";

import {
    fetchApprovedServices,
    streamApprovedServices,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/", fetchApprovedServices);

router.get("/stream", streamApprovedServices);

export default router;