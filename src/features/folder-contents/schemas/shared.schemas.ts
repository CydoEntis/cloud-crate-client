import { z } from "zod";
import { crateFolderSchema } from "./folder.schemas";
import { crateFileSchema } from "./file.schemas";

export const folderBreadcrumbSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string().default("#9CA3AF"),
  isRoot: z.boolean(),
});

export const folderContentsSchema = z.object({
  folders: z.array(crateFolderSchema),
  files: z.array(crateFileSchema),
  folderName: z.string(),
  parentFolderId: z.string().uuid().nullable(),
  breadcrumbs: z.array(folderBreadcrumbSchema),
  totalFolders: z.number().int().nonnegative(),
  totalFiles: z.number().int().nonnegative(),
});
