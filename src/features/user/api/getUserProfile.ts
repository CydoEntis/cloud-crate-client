import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";
import type { UserProfileResponse } from "../types/User";

export const getUserProfile = async (): Promise<UserProfileResponse> => {
  const { value: result, success, errors } = (await api.get<ApiResponse<UserProfileResponse>>("/user")).data;
  return result!;
};
