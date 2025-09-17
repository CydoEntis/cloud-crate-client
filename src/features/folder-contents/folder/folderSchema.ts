import { z } from "zod";
import { uploaderSchema } from "../../user/userSchemas";

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

export const createFolderSchema = z.object({
  name: z.string().min(1),
  crateId: z.string().uuid(),
  parentFolderId: z.string().uuid(),
  color: z.string(),
});

export const moveFolderSchema = z.object({
  newParentId: z.string().uuid().nullable(),
});
