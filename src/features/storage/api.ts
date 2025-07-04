import api from "@/lib/api";
import type { ApiResponse } from "../auth/types";
import type { CrateUsage } from "./types";

export const getCrateUsage = async (crateId: string): Promise<CrateUsage> => {
  const response = await api.get<ApiResponse<CrateUsage>>(`/crates/${crateId}/usage`);
  return response.data.data!;
};
