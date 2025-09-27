import { z } from "zod";
import { uploaderSchema } from "../../user/userSchemas";
import { ACCEPTED_EXTENSIONS } from "./fileUtils";

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

export const renameFileSchema = z.object({
  name: z
    .string()
    .min(1, "File name is required")
    .max(200, "File name too long")
    .refine((name) => !/[\/\\:*?"<>|]/.test(name), 'File name cannot contain: / \\ : * ? " < > |')
    .refine((name) => !/^\.+$/.test(name), "File name cannot be only dots")
    .refine((name) => !name.startsWith(" ") && !name.endsWith(" "), "File name cannot start or end with spaces")
    .refine(
      (name) => !/^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i.test(name),
      "File name cannot be a reserved system name"
    )
    .refine((name) => !/[\x00-\x1f\x7f]/.test(name), "File name cannot contain control characters"),
});
