import api from "@/lib/api";
import type { ApiResponse, AuthResponse, RegisterRequest } from "../types";

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const { value: result } = (await api.post<ApiResponse<AuthResponse>>("/auth/register", data)).data;
  return result!;
};
