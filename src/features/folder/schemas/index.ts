import { z } from "zod";

export const FolderSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  crateId: z.string().uuid(),
  parentFolderId: z.string().uuid().nullable(),
  createdAt: z.string().datetime().optional(),
  color: z.string(),
});

export const FolderListResponseSchema = z.array(FolderSchema);

export const CreateFolderRequestSchema = z.object({
  name: z.string().min(1),
  crateId: z.string().uuid(),
  parentFolderId: z.string().uuid().nullable().optional(),
  color: z.string(),
});

export const FolderResponseSchema = FolderSchema;

export const MoveFolderRequestSchema = z.object({
  newParentId: z.string().uuid().nullable(),
});
