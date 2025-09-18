import type { z } from "zod";
import type { loginSchema, registerSchema } from "./authSchemas";
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
