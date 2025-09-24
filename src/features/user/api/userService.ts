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
};
