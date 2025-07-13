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

export const FolderItemTypeSchema = z.enum(["Folder", "File"]);

export const FolderOrFileItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: FolderItemTypeSchema,
  crateId: z.string().uuid(),
  parentFolderId: z.string().uuid().nullable().optional(),
  mimeType: z.string().nullable().optional(),
  sizeInBytes: z.number().int().nullable().optional(),
  color: z.string().nullable().optional(),
  parentOfCurrentFolderId: z.string().uuid().nullable().optional(),
  isBackRow: z.boolean().optional(),
});

export const FolderContentsResponseSchema = z.object({
  items: z.array(FolderOrFileItemSchema),
  totalCount: z.number().int(),
  page: z.number().int(),
  pageSize: z.number().int(),
  parentFolderId: z.string().uuid().nullable().optional(),
  parentOfCurrentFolderId: z.string().uuid().nullable().optional(),
  folderName: z.string(),
});
