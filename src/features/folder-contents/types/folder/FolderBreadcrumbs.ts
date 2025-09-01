import type z from "zod";
import type { folderBreadcrumbSchema } from "../../schemas/FolderBreadcrumbSchema";

export type FolderBreadcrumb = z.infer<typeof folderBreadcrumbSchema>;
