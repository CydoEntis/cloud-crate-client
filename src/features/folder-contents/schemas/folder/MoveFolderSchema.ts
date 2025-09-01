import z from "zod";

export const MoveFolderSchema = z.object({
  newParentId: z.string().uuid().nullable(),
});
