import api from "@/lib/api";
import type { LoginRequest, ApiResponse } from "../types";

export const login = async (credentials: LoginRequest): Promise<{ token: string }> => {
  const {
    value: result,
    success,
    errors,
  } = (await api.post<ApiResponse<{ token: string }>>("/auth/login", credentials)).data;
  return result!;
};
