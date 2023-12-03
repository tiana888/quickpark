import type {
  GetSpacesResponse,
  GetSpaceResponse,
  CreateSpacePayload,
  CreateSpaceResponse,
  UpdateSpacePayload,
  UpdateSpaceResponse,
  checkAuthResponse,
  checkAuthPayload
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

export function checkAuth(input: checkAuthPayload){
  return client.post<checkAuthResponse>(`/users`, input)
}

export function createAccount(input: checkAuthPayload){
  return client.post<checkAuthPayload>(`/users/create`, input)
}