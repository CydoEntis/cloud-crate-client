import type z from "zod";
import type { loginSchema } from "./schemas";

export type LoginRequest = z.infer<typeof loginSchema>;
