import type { ApiResponse } from "@/features/auth/authTypes";
import apiService from "@/shared/lib/api/ApiClient";
import type { Member } from "../memberTypes";

export const memberService = {
  async getMembers(crateId: string): Promise<Member[]> {
    const response = await apiService.post<ApiResponse<Member[]>>(`/crates/${crateId}/members`);

    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Login failed:", errors);
      throw new Error(message ?? "Login failed");
    }

    return result;
  },
};
