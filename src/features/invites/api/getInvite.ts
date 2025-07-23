import api from "@/lib/api";
import type { CrateInvite } from "../types/CrateInvite";
import type { ApiResponse } from "@/features/auth";

export const getInviteByToken = async (token: string): Promise<CrateInvite> => {
  const response = await api.get<ApiResponse<CrateInvite>>(`/invites/token/${token}`);
  return response.data.value!;
};
