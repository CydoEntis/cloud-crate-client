import z from "zod";
import { crateFolderSchema } from "./folder/CrateFolderSchema";
import { crateFileSchema } from "./file/CrateFileSchema";
import { folderBreadcrumbSchema } from "./FolderBreadcrumbSchema";

export const folderContentsSchema = z.object({
  folders: z.array(crateFolderSchema),
  files: z.array(crateFileSchema),
  folderName: z.string(),
  parentFolderId: z.string().uuid().nullable(),
  breadcrumbs: z.array(folderBreadcrumbSchema),
  totalFolders: z.number().int().nonnegative(),
  totalFiles: z.number().int().nonnegative(),
});
