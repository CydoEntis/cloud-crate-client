import type { z } from "zod";
import type { loginSchema, registerSchema } from "./authSchemas";
import type { ApiError } from "@/shared/lib/formUtils";

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;

export type AuthResponse = {
  token: string;
  refreshToken?: string;
  user?: {
    id: string;
    email: string;
    displayName: string;
  };
};

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  profilePictureUrl?: string;
};

export type PaginatedResult<T> = {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export type ApiResponse<T> = {
  isSuccess: boolean;
  data: T | null;
  message?: string;
  statusCode: number;
  errors?: ApiError[];
  timestamp: string;
};
