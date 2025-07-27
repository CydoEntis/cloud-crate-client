import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";

export const acceptInvite = async (token: string): Promise<void> => {
  const d = await api.post<ApiResponse<void>>(`/invite/token/${token}/accept`);
  console.log("ACCEPT BITCH: ", d);
};
