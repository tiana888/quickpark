import {
    getSpaces,
    getSpace,
    createSpace,
    updateSpace,
  } from "../controllers/spaces";
  import express from "express";
  
  const router = express.Router();
  
  // GET /api/spaces
  router.get("/", getSpaces);
  // GET /api/sapces/:id
  router.get("/:id", getSpace);
  // POST /api/spaces
  router.post("/", createSpace);
  // PUT /api/spaces/:id
  router.put("/:id", updateSpace);
  
  // export the router
  export default router;
  