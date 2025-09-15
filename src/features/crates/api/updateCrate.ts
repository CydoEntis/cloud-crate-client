import type { ApiResponse } from "@/features/auth/types";
import apiService from "@/shared/lib/api/ApiClient";
import type { UpdateCrateRequest } from "../types/UpdateCrateRequest";
import type { CrateDetails } from "../types/CrateDetails";
import type { Crate } from "../types/Crate";

export const getCrateDetails = async (crateId: string): Promise<CrateDetails> => {
  const response = await apiService.get<ApiResponse<CrateDetails>>(`/crates/${crateId}`);
  return response.data.data!;
};

export const updateCrate = async ({
  crateId,
  name,
  color,
}: UpdateCrateRequest & { crateId: string }): Promise<Crate> => {
  const response = await apiService.put<ApiResponse<Crate>>(`/crates/${crateId}`, { name, color });
  console.log(response);
  return response.data.data!;
};
