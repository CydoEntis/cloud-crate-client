import type z from "zod";
import type { loginSchema } from "./schemas";
import type { ApiError } from "@/lib/formUtils";

export type LoginRequest = z.infer<typeof loginSchema>;

export type PaginatedResult<T> = {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export type ApiResponse<T> = {
  success: boolean;
  value: T | null;
  message?: string;
  statusCode: number;
  errors?: ApiError[];
};

export type RegisterRequest = {
  displayName: string;
  email: string;
  password: string;
  profilePictureUrl?: string;
};

export type AuthResponse = {
  token: string;
};
