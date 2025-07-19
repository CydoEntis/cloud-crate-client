import type { ApiResponse } from "@/features/auth/types";
import api from "@/lib/api";
import type { CreateCrateRequest, Crate } from "../types";

export const createCrate = async (data: CreateCrateRequest): Promise<Crate> => {
  const { value: result } = (await api.post<ApiResponse<Crate>>("/crates", data)).data;
  return result!;
};
