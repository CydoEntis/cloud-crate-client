import z from "zod";

export const UpdateCrateSchema = z.object({
  name: z.string().min(1, "Name is required").max(25, "Name must be less than 25 characters"),
  color: z.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, "Color must be a valid hex code"),
});
