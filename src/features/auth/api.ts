import api from "@/lib/api";
import type { ApiResponse, LoginRequest, RegisterRequest } from "./types";

export const login = async (credentials: LoginRequest): Promise<{ accessToken: string }> => {
  const {
    data: result,
    success,
    errors,
  } = (await api.post<ApiResponse<{ accessToken: string }>>("/auth/login", credentials)).data;
  return result!;
};

export const register = async (data: RegisterRequest): Promise<null> => {
  const { data: result } = (await api.post<ApiResponse<null>>("/auth/register", data)).data;

  return result;
};

// TODO: Added Refresh Request Type
export const refresh = async (): Promise<{ accessToken: string }> => {
  const { data: result } = (await api.post<ApiResponse<{ accessToken: string }>>("/auth/refresh")).data;

  return result!;
};
