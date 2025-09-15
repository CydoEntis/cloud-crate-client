import type { ApiResponse } from "@/features/auth";
import type { CrateInviteApiRequest } from "../types/CrateInviteApiRequest";
import apiService from "@/shared/lib/api/ApiClient";

export const inviteUserToCrate = async (data: CrateInviteApiRequest): Promise<void> => {
  await apiService.post<ApiResponse<void>>(`/invite`, data);
};
