import type { ApiResponse } from "@/features/auth";
import apiService from "@/shared/lib/api/ApiClient";

export const declineInvite = async (token: string): Promise<void> => {
  await apiService.post<ApiResponse<void>>(`/invites/token/${token}/decline`);
};
