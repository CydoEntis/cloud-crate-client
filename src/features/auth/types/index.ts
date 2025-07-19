import type z from "zod";
import type { ApiError } from "@/lib/formUtils";
import type { loginSchema, registerSchema } from "../schemas";

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;

export type ApiResponse<T> = {
  success: boolean;
  value: T | null;
  message?: string;
  statusCode: number;
  errors?: ApiError[];
};

export type UserResponse = {
  id: string;
  email: string;
  plan: "Free" | "Pro";
  crateLimit: number;
  crateCount: number;
  usedStorage: number;
};

export type RegisterResponse = {
  token: string;
  userId: string;
};