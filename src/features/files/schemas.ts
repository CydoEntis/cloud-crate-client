import { z } from "zod";

export const uploadFileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "File is required")
    .refine((file) => file.size <= 10 * 1024 * 1024, "Max file size is 10MB")
    .refine((file) => ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type), "Unsupported file type"),
  folderId: z.string().uuid().optional(),
});
