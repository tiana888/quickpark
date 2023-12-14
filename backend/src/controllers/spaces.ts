// controllers/spaces.js
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

// Get spaces by query parameters
export const getSpacesByQuery = async (req: Request, res: Response) => {
  try {
    const { floor, section, number } = req.query;
    const query: any = {};
    if (floor) query.floor = floor;
    if (section) query.section = section;
    // 斷言 number 是 string 類型後再進行 parseInt
    if (typeof number === 'string') query.number = parseInt(number, 10);


    const spaces = await SpaceModel.find(query);
    if (spaces.length === 0) {
      return res.status(404).json({ error: "未存在相符資料" });
    }
    res.status(200).json(spaces);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};


///////////////
// Get all Spaces
export const getSpaces = async (_: Request, res: Response<GetSpacesResponse>) => {
  try {
    const spaces = await SpaceModel.find({});

    // Return only the id and name of the list
    const spacesToReturn = spaces.map((space) => {
      return {
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
      };
    });

    return res.status(200).json(spacesToReturn);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};
// Get a section
export const getSection = async (
  req: Request<{ floor: string, section: string }>,
  res: Response<GetSpacesResponse | { error: string }>,
) => {
  try {
    const { floor, section  } = req.params;
    const spaces = await SpaceModel.find({ floor:floor, section:section });
    if (!spaces) {
      return res.status(404).json({ error: "It is not valid" });
    }
    const spacesToReturn = spaces.map((space) => {
      return {
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
      };
    });

    return res.status(200).json(spacesToReturn);
  } catch (error) {
    genericErrorHandler(error, res);
  }
};

// Get a space
export const getSpace = async (
  req: Request<{ floor:string, section: string, number: number }>,
  res: Response<GetSpaceResponse | { error: string }>,
) => {
  try {
    const { floor, section, number } = req.params;
    const space = await SpaceModel.findOne({floor:floor, section:section, number:number});
    if (!space) {
      return res.status(404).json({ error: "It is not valid" });
    }

    return res.status(200).json({
      id: space.id,
      floor: space.floor,
      section:space.section,
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
  req: Request<{ floor: string, section:string, number:number }, never, UpdateSpacePayload>,
  res: Response<UpdateSpaceResponse | { error: string }>,
) => {
  try {
    const { floor, section, number } = req.params;
    const { occupied, license, arrivalTime, departureTime, history } = req.body;
    const updateData: { [key: string]: string|Date|boolean|{ license: string; arrivalTime: Date; departureTime: Date; }[]} = {};

    if (occupied !== undefined) updateData.occupied = occupied;
    if (license !== undefined) updateData.license = license;
    if (arrivalTime !== undefined) updateData.arrivalTime = arrivalTime;
    if (departureTime !== undefined) updateData.departureTime = departureTime;
    if (history !== undefined) updateData.history = history;
    // Update the space
    const newSpace = await SpaceModel.findOneAndUpdate(
      {floor, section, number},
       
				updateData,
			
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
