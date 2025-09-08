import z from "zod";

export const CreateFolderSchema = z.object({
  name: z.string().min(1),
  crateId: z.string().uuid(),
  parentFolderId: z.string().uuid(),
  color: z.string(),
});
