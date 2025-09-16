import apiService from "@/shared/lib/api/ApiClient";
import type { ApiResponse } from "@/features/auth/auth.types";
import type { User } from "../user.types";

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
};
