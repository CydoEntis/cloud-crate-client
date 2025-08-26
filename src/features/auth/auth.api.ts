import api from "@/lib/api";
import type { ApiResponse, AuthResponse, LoginRequest, RegisterRequest } from "./types";

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const { value: result } = (await api.post<ApiResponse<{ token: string }>>("/auth/login", credentials)).data;
  return result!;
};

export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const { value: result } = (await api.post<ApiResponse<AuthResponse>>("/auth/register", data)).data;
  return result!;
};


// TODO: Added Refresh Request Type
// FIX: Actual refresh functionality needs to be implemented
// export const refresh = async (): Promise<{ accessToken: string }> => {
//   const { data: result } = (await api.post<ApiResponse<{ accessToken: string }>>("/auth/refresh")).data;
//   return result!;
// };
