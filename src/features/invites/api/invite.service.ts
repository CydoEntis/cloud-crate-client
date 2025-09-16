import apiService from "@/shared/lib/api/ApiClient";
import type { ApiResponse } from "@/features/auth/auth.types";
import type { CrateInvite, CrateInviteRequest } from "../invite.types";


export const inviteService = {
  async inviteUserToCrate(request: CrateInviteRequest): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/invite`, request);
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to invite user to crate:", errors);
      throw new Error(message ?? `Failed to invite user to crate`);
    }

    return result;
  },

  async getInviteByToken(token: string): Promise<CrateInvite> {
    const response = await apiService.get<ApiResponse<CrateInvite>>(`/invite/token/${token}`);
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to fetch invite:", errors);
      throw new Error(message ?? `Failed to fetch invite`);
    }

    return result;
  },

  async acceptInvite(token: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/invite/token/${token}/accept`);
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to accept invite:", errors);
      throw new Error(message ?? `Failed to accept invite`);
    }

    return result;
  },

  async declineInvite(token: string): Promise<void> {
    const response = await apiService.post<ApiResponse<void>>(`/invite/token/${token}/decline`);
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Failed to decline invite:", errors);
      throw new Error(message ?? `Failed to decline invite`);
    }

    return result;
  },
};
