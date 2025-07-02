import { z } from "zod";

export const FolderSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  parentFolderId: z.string().uuid().nullable(),
  crateId: z.string().uuid(),
});

export const CreateFolderRequestSchema = z.object({
  name: z.string().min(1),
  crateId: z.string().uuid(),
  parentFolderId: z.string().uuid().nullable().optional(),
});

export const FolderResponseSchema = FolderSchema;

export const FolderListResponseSchema = z.array(FolderResponseSchema);

export const MoveFolderRequestSchema = z.object({
  newParentId: z.string().uuid().nullable(),
});
