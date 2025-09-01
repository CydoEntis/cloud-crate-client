import z from "zod";

export const MoveFileSchema = z.object({
  newParentId: z.string().nullable(),
});
