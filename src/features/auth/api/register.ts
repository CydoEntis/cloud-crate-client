import api from "@/lib/api";
import type { RegisterRequest, ApiResponse, RegisterResponse } from "../types";

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const { value: result } = (await api.post<ApiResponse<RegisterResponse>>("/auth/register", data)).data;
  console.log(result);
  return result!;
};
