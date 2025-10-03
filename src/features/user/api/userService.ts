import apiService from "@/shared/lib/api/ApiService";
import type { User } from "../userTypes";
import type { ApiResponse } from "@/shared/lib/sharedTypes";

export const userService = {
  async getUser(): Promise<User> {
    const response = await apiService.get<ApiResponse<User>>(`/user`);
    const { data: result, isSuccess, message, errors } = response.data;
    if (!isSuccess || !result) {
      console.error("Failed to fetch user:", errors);
      throw new Error(message ?? `Failed to fetch user`);
    }
    return result;
  },

  async updateDisplayName(displayName: string): Promise<void> {
    const response = await apiService.put<ApiResponse<void>>("/user/display-name", { displayName });
    const { isSuccess, message, errors } = response.data;
    if (!isSuccess) {
      console.error("Failed to update display name:", errors);
      throw new Error(message ?? "Failed to update display name");
    }
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const response = await apiService.put<ApiResponse<void>>("/auth/password", {
      currentPassword,
      newPassword,
    });
    const { isSuccess, message, errors } = response.data;
    if (!isSuccess) {
      console.error("Failed to change password:", errors);
      throw new Error(message ?? "Failed to change password");
    }
  },
};
