import z from "zod";

export const BreadcrumbSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, {
    message: "Color must be a valid hex code",
  }),
});

type Breadcrumb = z.infer<typeof BreadcrumbSchema>;
