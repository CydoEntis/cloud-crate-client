import { z } from "zod";

export const uploaderSchema = z.object({
  userId: z.string().optional().default(""),
  displayName: z.string().optional().default(""),
  email: z.string().email().or(z.string().min(0)).default(""),
  profilePictureUrl: z.string().url().or(z.string().min(0)).default(""),
});
