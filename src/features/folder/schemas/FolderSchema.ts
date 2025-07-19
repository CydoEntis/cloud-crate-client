import z from "zod";

export const FolderSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  crateId: z.string().uuid(),
  parentFolderId: z.string().uuid().nullable(),
  createdAt: z.string().datetime().optional(),
  color: z.string(),
});
