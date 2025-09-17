import { z } from "zod";
import { uploaderSchema } from "../../user/userSchemas";
import { ACCEPTED_EXTENSIONS } from "../utils/fileUtils";

export const crateFileSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  sizeInBytes: z.number().int().nonnegative().default(0),
  mimeType: z.string().default("application/octet-stream"),
  fileUrl: z.string().url().or(z.string().min(0)).default(""),
  isFolder: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  crateId: z.string().uuid(),
  folderId: z.string().uuid().nullable(),
  folderName: z.string().nullable(),
  uploader: uploaderSchema.default({}),
  createdAt: z.string().datetime(),
});

export const crateFileListSchema = z.array(crateFileSchema);

export const moveFileSchema = z.object({
  newParentId: z.string().nullable(),
});

export const uploadFileSchema = z.object({
  folderId: z.string(),
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
