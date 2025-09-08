import z from "zod";

export const folderBreadcrumbSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string().default("#9CA3AF"),
  isRoot: z.boolean(),
});