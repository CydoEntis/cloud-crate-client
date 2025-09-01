import z from "zod";
import { uploaderSchema } from "../UploaderSchema";

export const crateFolderSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string().default("#EAAC00"),
  sizeInBytes: z.number().int().nonnegative().default(0),
  parentFolderId: z.string().uuid().nullable(),
  parentFolderName: z.string().nullable(),
  crateId: z.string().uuid(),
  uploader: uploaderSchema.default({}),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  isDeleted: z.boolean().default(false),
  isFolder: z.boolean().default(true),
});
