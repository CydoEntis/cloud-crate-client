import z from "zod";

export const StoredFileSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  crateId: z.string().uuid(),
  folderId: z.string().uuid().nullable(),
  mimeType: z.string(),
  size: z.number().optional().default(0),
  uploadDate: z.string().optional().default(""),
  uploadedBy: z.string().optional().default(""),
  isFolder: z.boolean().optional(),
  folderColor: z.string().optional(),
});
