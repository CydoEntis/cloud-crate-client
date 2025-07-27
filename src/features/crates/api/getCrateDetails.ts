// features/crate/api/index.ts
import api from "@/lib/api";
import type { ApiResponse } from "@/features/auth/types";
import type { CrateDetails } from "../types/CrateDetails";

export const getCrateDetails = async (crateId: string): Promise<CrateDetails> => {
  const response = await api.get<ApiResponse<CrateDetails>>(`/crates/${crateId}`);
  return response.data.value!;
};
