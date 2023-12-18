import { getSpaceByLicense } from "../controllers/licenses";
import express from "express";

const router = express.Router();

// GET /api/licenses/:license
router.get("/:license", getSpaceByLicense);

// export the router
export default router;
