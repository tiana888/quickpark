import UserModel from "../models/user";
import { genericErrorHandler } from "../utils/errors";
import type { checkAuthPayload, checkAuthResponse } from "@lib/shared_types";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";

// check Auth

export const checkAuth = async (
  _req: Request<never, never, checkAuthPayload>,
  res: Response<checkAuthResponse>,
) => {
  try {
    const { username, password } = _req.body;

    const user = await UserModel.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ success: false });
    }
    const isValid = await bcrypt.compare(password, user?.hashed_password);
    if (!isValid) {
      return res.status(401).json({ success: false });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

export const createAccount = async (
  _req: Request<never, never, checkAuthPayload>,
  res: Response<checkAuthResponse>,
) => {
  try {
    const { username, password } = _req.body;

    const user = await UserModel.findOne({ username: username });
    if (user) {
      return res.status(401).json({ success: false });
    }
    if (password.length < 8) {
      return res.status(401).json({ success: false });
    }
    const hashed_password = await bcrypt.hash(password, 10);
    //db插入
    const newUser = await UserModel.create({ username, hashed_password });

    if (!newUser) return res.status(401).json({ success: false });
    return res.status(200).json({ success: true });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};
