import type { ApiResponse } from "@/features/auth";
import type { CrateInvite, CrateInviteDetails } from "../types/CrateInvite";
import api from "@/lib/api";

export const getInviteByToken = async (token: string): Promise<CrateInviteDetails> => {
  const response = await api.get<ApiResponse<CrateInviteDetails>>(`/invite/token/${token}`);
  console.log(response);
  return response.data.value!;
};
