import type z from "zod";
import type { loginSchema, registerSchema } from "./schemas";
import type { ApiError } from "@/lib/formUtils";

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;

export type ApiResponse<T> = {
  success: boolean;
  data: T | null;
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
