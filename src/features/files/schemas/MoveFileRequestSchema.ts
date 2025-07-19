import z from "zod";

export const MoveFileRequestSchema = z.object({
  newParentId: z.string().nullable(),
});
