import z from "zod";
import { FolderOrFileItemSchema } from "./FolderOrFileItemSchema";

export const FolderContentsResultSchema = z.object({
  folderName: z.string(),
  parentFolderId: z.string().uuid().nullable(),
  breadcrumbs: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
    })
  ),
  items: z.array(FolderOrFileItemSchema),
  totalCount: z.number().int(),
  page: z.number().int(),
  pageSize: z.number().int(),
});

export type FolderContentsResult = z.infer<typeof FolderContentsResultSchema>;
