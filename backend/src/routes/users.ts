import {
    checkAuth,
    createAccount
  } from "../controllers/users";
  import express from "express";
  
  const router = express.Router();
  
  // POST /api/users
  router.post("/", checkAuth);

  // POST /api/users/create
  router.post("/create",createAccount) 

  export default router;
  