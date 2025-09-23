import type { z } from "zod";
import type { User } from "@/features/user/userTypes";
import type {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  authResponseSchema,
} from "./authSchemas";

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;

export type AuthResponse = Omit<z.infer<typeof authResponseSchema>, "user"> & {
  user?: User;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};
