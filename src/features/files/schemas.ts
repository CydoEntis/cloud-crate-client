import { z } from "zod";

export const uploadFileSchema = z.object({
  files: z
    .array(z.instanceof(File))
    .min(1, "Please select at least one file")
    .refine((files) => files.every((f) => f.size <= 10 * 1024 * 1024), {
      message: "Each file must be under 10MB",
    })
    .refine((files) => files.every((f) => ["image/png", "image/jpeg", "image/svg+xml"].includes(f.type)), {
      message: "Unsupported file type",
    }),
  folderId: z.string().uuid().optional(),
});
