import type { z } from "zod";
import type { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from "./authSchemas";

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>;

export type AuthResponse = {
  accessToken: string;
  accessTokenExpires: string;
  tokenType: string;
  user?: {
    id: string;
    email: string;
    displayName: string;
  };
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type AuthUser = {
  id: string;
  email: string;
  displayName: string;
  profilePictureUrl?: string;
  isAdmin: boolean;
};
