import api from "@/lib/api";
import type { RegisterRequest, ApiResponse, RegisterResponse } from "../types";

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const { data: result } = (await api.post<ApiResponse<RegisterResponse>>("/auth/register", data)).data;
  return result!;
};
