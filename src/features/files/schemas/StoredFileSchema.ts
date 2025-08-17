import z from "zod";

export const StoredFileSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  crateId: z.string().uuid(),
  folderId: z.string().uuid().nullable(),
  mimeType: z.string().nullable().optional(),
  sizeInBytes: z.number().int().optional().default(0),
  uploadDate: z.string().optional(),
  uploadedByUserId: z.string().optional(),
  uploadedByDisplayName: z.string().optional(),
  uploadedByEmail: z.string().optional(),
  uploadedByProfilePictureUrl: z.string().optional(),
  isFolder: z.boolean().optional(),
  folderColor: z.string().optional(),
  fileUrl: z.string().optional(),
  createdAt: z.string().optional(),
});
