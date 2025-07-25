import z from "zod";

export const CreateFolderRequestSchema = z.object({
  name: z.string().min(1),
  crateId: z.string().uuid(),
  parentFolderId: z.string().uuid().nullable().optional(),
  color: z.string(),
});
