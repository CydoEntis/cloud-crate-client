import { z } from "zod";
import { ACCEPTED_EXTENSIONS } from "../util";

export const UploadFileSchema = z.object({
  folderId: z.string().optional(),
  files: z
    .array(z.instanceof(File))
    .min(1, { message: "Please select at least one file." })
    .refine(
      (files) =>
        files.every((file) => {
          const ext = file.name.split(".").pop()?.toLowerCase();
          return ext && ACCEPTED_EXTENSIONS.includes(ext);
        }),
      {
        message: "One or more files have an unsupported file type.",
      }
    )
    .refine((files) => files.every((file) => file.size <= 10 * 1024 * 1024), {
      message: "Each file must be under 10MB.",
    }),
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
  folderColor: z.string().optional(),
});

export const StoredFileListSchema = z.array(StoredFileSchema);

export const MoveFileRequestSchema = z.object({
  newParentId: z.string().nullable(),
});
