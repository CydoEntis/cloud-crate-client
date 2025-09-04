import api from "@/lib/api";
import type { LoginRequest, ApiResponse } from "../types";

export const login = async (credentials: LoginRequest): Promise<{ token: string }> => {
  const response = await api.post<ApiResponse<{ token: string }>>(
    "/auth/login",
    credentials
  );
  console.log(response);
  const { value: result, isSuccess, message, errors } = response.data;

  if (!isSuccess) {
    console.error("Login failed:", errors);
    throw new Error(message ?? "Login failed");
  }

  return result!;
};
