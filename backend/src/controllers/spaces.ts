import SpaceModel from "../models/space";
import { genericErrorHandler } from "../utils/errors";
import type {
  GetSpacesResponse,
  GetSpaceResponse,
  CreateSpacePayload,
  CreateSpaceResponse,
  UpdateSpacePayload,
  UpdateSpaceResponse,
} from "@lib/shared_types";
import type { Request, Response } from "express";

// Get all Spaces
export const getSpaces = async (_: Request, res: Response<GetSpacesResponse>) => {
  try {
    const spaces = await SpaceModel.find({});

    // Return only the id and name of the list
    const spacesToReturn = spaces.map((space) => {
      return {
        id: space.id,
        number: space.number,
        priority: space.priority,
				occupied: space.occupied,
				license: space.license,
				arrivalTime: space.arrivalTime,
				departureTime: space.departureTime,
				history: space.history,
      };
    });

    return res.status(200).json(spacesToReturn);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Get a space
export const getSpace = async (
  req: Request<{ id: string }>,
  res: Response<GetSpaceResponse | { error: string }>,
) => {
  try {
    const { id } = req.params;
    const space = await SpaceModel.findById(id);
    if (!space) {
      return res.status(404).json({ error: "id is not valid" });
    }

    return res.status(200).json({
      id: space.id,
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

// Create a space
export const createSpace = async (
  req: Request<never, never, CreateSpacePayload>,
  res: Response<CreateSpaceResponse>,
) => {
  try {
    const { id } = await SpaceModel.create(req.body);
    return res.status(201).json({ id });
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Update a space
export const updateSpace = async (
  req: Request<{ id: string }, never, UpdateSpacePayload>,
  res: Response<UpdateSpaceResponse | { error: string }>,
) => {
  try {
    const { id } = req.params;
    const { number, priority, occupied, license, arrivalTime, departureTime, history } = req.body;

    // Update the space
    const newSpace = await SpaceModel.findByIdAndUpdate(
      id,
      {
        number: number,
				priority: priority,
				occupied: occupied,
				license: license,
				arrivalTime: arrivalTime,
				departureTime: departureTime,
				history: history,
			},
      { new: true },
    );

    // If the space is not found, return 404
    if (!newSpace) {
      return res.status(404).json({ error: "id is not valid" });
    }

    return res.status(200).send("OK");
  } catch (error) {
    genericErrorHandler(error, res);
  }
};
