import z from "zod";

export const UpdateCrateSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Crate name must be at least 3 characters long." })
    .max(100, { message: "Crate name must be at most 100 characters long." })
    .regex(/^[a-zA-Z0-9 _-]*$/, { message: "Crate name contains invalid characters." }),

  color: z
    .string()
    .min(1, { message: "Color is required." })
    .regex(/^#([0-9A-Fa-f]{6})$/, { message: "Color is invalid." }),
});
