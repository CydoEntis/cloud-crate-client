import apiService from "@/shared/lib/api/ApiClient";
import type { LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from "../authTypes";
import { authResponseSchema } from "../authSchemas";
import type { User } from "@/features/user/userTypes";

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiService.post<ApiResponse<AuthResponse>>("/auth/login", credentials);

    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Login failed:", errors);
      throw new Error(message ?? "Login failed");
    }

    const validatedData = authResponseSchema.parse(result);
    return validatedData;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiService.post<ApiResponse<AuthResponse>>("/auth/register", userData);

    const { data: result, isSuccess, message, errors } = response.data;

    if (!isSuccess || !result) {
      console.error("Registration failed:", errors);
      throw new Error(message ?? "Registration failed");
    }

    return authResponseSchema.parse(result);
  },

  async logout(): Promise<void> {
    try {
      await apiService.post("/auth/logout");
    } catch (error) {
      console.warn("Logout API call failed:", error);
    }
  },

  async refresh(): Promise<{ token: string }> {
    const response = await apiService.post<ApiResponse<{ token: string }>>("/auth/refresh");

    const { data: result, isSuccess, message } = response.data;

    if (!isSuccess || !result) {
      throw new Error(message ?? "Token refresh failed");
    }

    return result;
  },

  async me(): Promise<User> {
    const response = await apiService.get<ApiResponse<User>>("/auth/me");

    const { data: result, isSuccess, message } = response.data;

    if (!isSuccess || !result) {
      throw new Error(message ?? "Failed to fetch user data");
    }

    return result;
  },
};
