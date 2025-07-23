import type { ApiResponse } from "@/features/auth/types";
import api from "@/lib/api";

export const declineInvite = async (token: string): Promise<void> => {
  await api.post<ApiResponse<void>>(`/invites/token/${token}/decline`);
};
