import api from "@/lib/api";
import type { ApiResponse } from "@/features/auth/types";
import type { CrateDetailsResponse, UpdateCrateRequest } from "../types";

export const getCrateDetails = async (crateId: string): Promise<CrateDetailsResponse> => {
  const response = await api.get<ApiResponse<CrateDetailsResponse>>(`/crates/${crateId}`);
  return response.data.data!;
};

export const updateCrate = async ({
  crateId,
  name,
  color,
}: UpdateCrateRequest & { crateId: string }): Promise<CrateDetailsResponse> => {
  const response = await api.put<ApiResponse<CrateDetailsResponse>>(`/crates/${crateId}`, { name, color });
  return response.data.data!;
};
