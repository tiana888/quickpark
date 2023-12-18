// controllers/spaces.js
import SpaceModel from "../models/space";
import { genericErrorHandler } from "../utils/errors";
import type { GetSpaceResponse } from "@lib/shared_types";
import type { Request, Response } from "express";

export const getSpaceByLicense = async (
  req: Request<{ license: string }>,
  res: Response<GetSpaceResponse | { error: string }>,
) => {
  try {
    const { license } = req.params;
    const space = await SpaceModel.findOne({ license: license });

    if (!space) {
      return res.status(404).json({ error: "It is not valid" });
    }
    return res.status(200).json({
      id: space.id,
      floor: space.floor,
      section: space.section,
      number: space.number,
      priority: space.priority,
      occupied: space.occupied,
      license: space.license,
      arrivalTime: space.arrivalTime,
      departureTime: space.departureTime,
      history: space.history,
    });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};
