import api from "@/lib/api";
import type { ApiResponse } from "../auth/types";
import type { Crate, CreateCrateRequest } from "./types";

export const createCrate = async (data: CreateCrateRequest): Promise<Crate> => {
  const { data: result } = (await api.post<ApiResponse<Crate>>("/crates", data)).data;
  return result!;
};

export const getUserCrates = async (): Promise<Crate[]> => {
  const { data: result } = (await api.get<ApiResponse<Crate[]>>("/crates")).data;
  console.log("RESULT: ", result);
  return result!;
};
