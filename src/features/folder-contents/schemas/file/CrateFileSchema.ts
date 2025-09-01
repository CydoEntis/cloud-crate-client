import z from "zod";
import { uploaderSchema } from "../UploaderSchema";

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
