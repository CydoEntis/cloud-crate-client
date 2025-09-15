import type { ApiResponse } from "@/features/auth";
import type { CrateInvite, CrateInviteDetails } from "../types/CrateInvite";
import apiService from "@/shared/lib/api/ApiClient";

export const getInviteByToken = async (token: string): Promise<CrateInviteDetails> => {
  const response = await apiService.get<ApiResponse<CrateInviteDetails>>(`/invite/token/${token}`);
  console.log(response);
  return response.data.data!;
};
