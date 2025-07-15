import z from "zod";

export const createCrateSchema = z.object({
  name: z.string().min(1),
  color: z.string().min(1),
});

export const updateCrateSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  color: z.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, "Color must be a valid hex code"),
});
