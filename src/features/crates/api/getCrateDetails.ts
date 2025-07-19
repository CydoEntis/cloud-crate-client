// features/crate/api/index.ts
import api from "@/lib/api";
import type { ApiResponse } from "@/features/auth/types";
import type { CrateDetailsResponse } from "../types";

export const getCrateDetails = async (crateId: string): Promise<CrateDetailsResponse> => {
  const response = await api.get<ApiResponse<CrateDetailsResponse>>(`/crates/${crateId}`);
  return response.data.value!;
};
