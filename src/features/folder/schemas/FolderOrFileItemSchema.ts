import z from "zod";
import { FolderItemTypeSchema } from "./FolderItemTypeSchema";

export const FolderOrFileItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: FolderItemTypeSchema,
  crateId: z.string().uuid(),
  parentFolderId: z.string().uuid().nullable().optional(),
  mimeType: z.string().nullable().optional(),
  sizeInBytes: z.number().int().optional(),
  color: z.string().nullable().optional(),
  parentOfCurrentFolderId: z.string().uuid().nullable().optional(),
  isBackRow: z.boolean().optional(),

  uploadedByUserId: z.string(),
  uploadedByDisplayName: z.string(),
  uploadedByEmail: z.string(),
  uploadedByProfilePictureUrl: z.string(),
  createdAt: z.string(),
  parentFolderName: z.string().nullable().optional(),
  fileUrl: z.string().url().nullable().optional(),
});
