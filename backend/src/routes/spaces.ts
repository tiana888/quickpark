import {
  getSpaces,
  getSection,
  getSpace,
  createSpace,
  updateSpace,
  getSpacesByQuery, // 新添加的处理函数
} from "../controllers/spaces";
import express from "express";

const router = express.Router();

// 新增路由以处理带查询参数的请求
router.get("/all", getSpacesByQuery);

// GET /api/spaces
router.get("/", getSpaces);
// GET /api/spaces/:section
router.get("/:floor/:section", getSection);
// GET /api/spaces/:floor/:section/:number
router.get("/:floor/:section/:number", getSpace);
// GET /api/spaces/:license
//router.get("/:license", getSpaceByLicense);

// POST /api/spaces
router.post("/", createSpace);
// PUT /api/spaces/:id
router.put("/:floor/:section/:number", updateSpace);

// export the router
export default router;
