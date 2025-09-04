import type z from "zod";
import type { ApiError } from "@/lib/formUtils";
import type { loginSchema, registerSchema } from "../schemas";

export type LoginRequest = z.infer<typeof loginSchema>;

export type PaginatedResult<T> = {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
};

export type ApiResponse<T> = {
  isSuccess: boolean;
  value: T | null;
  message?: string;
  statusCode: number;
  errors?: ApiError[];  
  timestamp: string;
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
