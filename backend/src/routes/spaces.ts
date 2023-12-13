import {
  getSpaces,
  getSection,
  getSpace,
  createSpace,
  updateSpace,
  getSpaceByLicense,
} from "../controllers/spaces";
import express from "express";

const router = express.Router();

// GET /api/spaces
router.get("/", getSpaces);
// GET /api/spaces/:section
router.get("/:floor/:section", getSection);
// GET /api/spaces/:floor/:section/:number
router.get("/:floor/:section/:number", getSpace);
// GET /api/spaces/:license
router.get("/:license", getSpaceByLicense);

// POST /api/spaces
router.post("/", createSpace);
// PUT /api/spaces/:id
router.put("/:floor/:section/:number", updateSpace);

// export the router
export default router;
