import { z } from "zod";
import { crateFolderSchema } from "./folder/folderSchema";
import { crateFileSchema } from "./file/fileSchema";
import { allowedOrderByValues } from "./sharedTypes";


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

export const folderSearchSchema = z.object({
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
  search: z.string().optional(),
  orderBy: z.enum(allowedOrderByValues).optional().default("Name"),
  ascending: z.boolean().default(false),
});