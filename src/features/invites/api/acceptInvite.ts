import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";

export const acceptInvite = async (token: string): Promise<void> => {
  await api.post<ApiResponse<void>>(`/invites/token/${token}/accept`);
};
