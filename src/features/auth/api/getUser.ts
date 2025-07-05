import api from "@/lib/api";
import type { UserResponse, ApiResponse } from "../types";

export const getUser = async (): Promise<UserResponse> => {
  const { data: result, success, errors } = (await api.get<ApiResponse<UserResponse>>("/auth/user")).data;
  return result!;
};
