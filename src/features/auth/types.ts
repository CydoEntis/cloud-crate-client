import type z from "zod";
import type { loginSchema, registerSchema } from "./schemas";

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;
