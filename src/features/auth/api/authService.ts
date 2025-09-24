import apiService from "@/shared/lib/api/ApiService";
import { authResponseSchema } from "../authSchemas";
import type { ApiResponse } from "@/shared/lib/sharedTypes";
import type { LoginRequest, AuthResponse, RegisterRequest, ResetPasswordRequest } from "../authTypes";

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiService.post<ApiResponse<AuthResponse>>("/auth/login", credentials);
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Login failed:", errors);
      throw new Error(message ?? "Login failed");
    }

    const validatedData = authResponseSchema.parse(result) as AuthResponse;
    return validatedData;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiService.post<ApiResponse<AuthResponse>>("/auth/register", userData);
    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Registration failed:", errors);
      throw new Error(message ?? "Registration failed");
    }

    return authResponseSchema.parse(result) as AuthResponse;
  },

  async logout(): Promise<void> {
    try {
      await apiService.post("/auth/logout");
    } catch (error) {
      console.warn("Logout API call failed:", error);
    }
  },

  async forgotPassword(email: string): Promise<void> {
    const response = await apiService.post<ApiResponse<null>>("/auth/forgot-password", { email });
    const { isSuccess, message } = response.data;

    if (!isSuccess) {
      throw new Error(message ?? "Failed to send reset email");
    }
  },

  async resetPassword(resetData: ResetPasswordRequest): Promise<void> {
    const response = await apiService.post<ApiResponse<null>>("/auth/reset-password", resetData);
    const { isSuccess, message } = response.data;

    if (!isSuccess) {
      throw new Error(message ?? "Password reset failed");
    }
  },
};
