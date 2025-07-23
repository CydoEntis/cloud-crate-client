import api from "@/lib/api";
import type { LoginRequest, ApiResponse } from "../types";

export const login = async (credentials: LoginRequest): Promise<string> => {
  const { value: result, success, errors } = (await api.post<ApiResponse<string>>("/auth/login", credentials)).data;
  return result!;
};
