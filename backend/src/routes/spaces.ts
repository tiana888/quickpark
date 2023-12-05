import {
    getSpaces,
    getSection,
    getSpace,
    createSpace,
    updateSpace,
  } from "../controllers/spaces";
  import express from "express";
  
  const router = express.Router();
  
  // GET /api/spaces
  router.get("/", getSpaces);
  // GET /api/sapces/:section
  router.get("/:floor/:section", getSection);
  // GET /api/sapces/:floor/:section/:number
  router.get("/:floor/:section/:number", getSpace);

  // POST /api/spaces
  router.post("/", createSpace);
  // PUT /api/spaces/:id
  router.put("/:floor/:section/:number", updateSpace);
  
  // export the router
  export default router;
  