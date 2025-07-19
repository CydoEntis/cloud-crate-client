import z from "zod";

export const CreateCrateSchema = z.object({
  name: z.string().min(1),
  color: z.string().min(1),
});
