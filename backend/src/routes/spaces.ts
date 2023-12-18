import {
  getSpaces,
  getSection,
  getSpace,
  createSpace,
  updateSpace,
  getFloor,
} from "../controllers/spaces";
import express from "express";

const router = express.Router();

// GET /api/spaces
router.get("/", getSpaces);
// GET /api/spaces/:floor
router.get("/:floor", getFloor);
// GET /api/spaces/:floor/:section
router.get("/:floor/:section", getSection);
// GET /api/spaces/:floor/:section/:number
router.get("/:floor/:section/:number", getSpace);

// POST /api/spaces
router.post("/", createSpace);
// PUT /api/spaces/:id
router.put("/:floor/:section/:number", updateSpace);

// export the router
export default router;
