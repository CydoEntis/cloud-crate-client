import api from "@/lib/api";
import type { LoginRequest, ApiResponse } from "../types";

export const login = async (credentials: LoginRequest): Promise<{ accessToken: string }> => {
  const {
    data: result,
    success,
    errors,
  } = (await api.post<ApiResponse<{ accessToken: string }>>("/auth/login", credentials)).data;
  return result!;
};
