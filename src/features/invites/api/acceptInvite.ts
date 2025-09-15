import type { ApiResponse } from "@/features/auth";
import apiService from "@/shared/lib/api/ApiClient";

export const acceptInvite = async (token: string): Promise<void> => {
  const d = await apiService.post<ApiResponse<void>>(`/invite/token/${token}/accept`);
  console.log("ACCEPT BITCH: ", d);
};
