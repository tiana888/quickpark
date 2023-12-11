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
export function getSection(floor: string, section: string) {
  return client.get<GetSpacesResponse>(`/spaces/${floor}/${section}`);
}
export function getSpace(floor: string, section: string, number: number) {
  return client.get<GetSpaceResponse>(`/spaces/${floor}/${section}/${number}`);
}
export function getSpaceByLicense(license: string) {
  return client.get<GetSpaceResponse>(`/spaces/${license}`);
}

export function updateSpace(floor: string, section: string, number: number, input: UpdateSpacePayload) {
  return client.put<UpdateSpaceResponse>(`/spaces/${floor}/${section}/${number}`, input);
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