// features/crate/api/index.ts
import type { ApiResponse } from "@/features/auth/types";
import type { CrateDetails } from "../types/CrateDetails";
import apiService from "@/shared/lib/api/ApiClient";

export const getCrateDetails = async (crateId: string): Promise<CrateDetails> => {
  const response = await apiService.get<ApiResponse<CrateDetails>>(`/crates/${crateId}`);
  return response.data.data!;
};
