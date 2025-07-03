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

export const StoredFileSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  crateId: z.string().uuid(),
  folderId: z.string().uuid().nullable(),
  mimeType: z.string(),
  size: z.number().optional().default(0),
  uploadDate: z.string().optional().default(""),
  uploadedBy: z.string().optional().default(""),
  isFolder: z.boolean().optional(),
});

export const StoredFileListSchema = z.array(StoredFileSchema);
