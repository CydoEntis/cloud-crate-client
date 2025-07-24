import type { ApiResponse } from "@/features/auth";
import type { CrateInvite } from "../types/CrateInvite";
import api from "@/lib/api";

export const getInviteByToken = async (token: string): Promise<CrateInvite> => {
  const response = await api.get<ApiResponse<CrateInvite>>(`/invite/token/${token}`);
  console.log(response);
  return response.data.value!;
};
