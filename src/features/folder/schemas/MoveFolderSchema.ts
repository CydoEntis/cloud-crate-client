import z from "zod";

export const MoveFolderRequestSchema = z.object({
  newParentId: z.string().uuid().nullable(),
});
