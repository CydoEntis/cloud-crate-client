import api from "@/lib/api";
import type { ApiResponse } from "@/features/auth/types";
import type { CrateDetailsResponse, CrateResponse, UpdateCrateRequest } from "../types";

export const getCrateDetails = async (crateId: string): Promise<CrateDetailsResponse> => {
  const response = await api.get<ApiResponse<CrateDetailsResponse>>(`/crates/${crateId}`);
  return response.data.value!;
};

export const updateCrate = async ({
  crateId,
  name,
  color,
}: UpdateCrateRequest & { crateId: string }): Promise<CrateResponse> => {
  const response = await api.put<ApiResponse<CrateResponse>>(`/crates/${crateId}`, { name, color });
  console.log(response);
  return response.data.value!;
};
