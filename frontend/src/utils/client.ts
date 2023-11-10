import type {
  GetSpacesResponse,
  GetSpaceResponse,
  CreateSpacePayload,
  CreateSpaceResponse,
  UpdateSpacePayload,
  UpdateSpaceResponse,
} from "@lib/shared_types";

import axios from "axios";

import { env } from "./env";

const client = axios.create({
  baseURL: env.VITE_API_URL,
});

export function getSpaces() {
  return client.get<GetSpacesResponse>("/spaces");
}

export function getSpace(id: string ) {
  return client.get<GetSpaceResponse>(`/spaces/${id}`);
}

export function updateSpace(id: string, input: UpdateSpacePayload) {
  return client.put<UpdateSpaceResponse>(`/spaces/${id}`, input);
}

export function createSpace(input: CreateSpacePayload) {
  return client.post<CreateSpaceResponse>("/spaces", input);
}