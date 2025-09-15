import type { ApiResponse } from "@/features/auth/types";
import type { Crate } from "../types/Crate";
import type { CreateCrateRequest } from "../types/CreateCrateRequest";
import apiService from "@/shared/lib/api/ApiClient";

export const createCrate = async (data: CreateCrateRequest): Promise<Crate> => {
  const { data: result } = (await apiService.post<ApiResponse<Crate>>("/crates", data)).data;
  return result!;
};
