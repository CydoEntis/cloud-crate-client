import z from "zod";
import { FolderOrFileItemSchema } from "./FolderOrFileItemSchema";

export const FolderContentsResponseSchema = z.object({
  items: z.array(FolderOrFileItemSchema),
  totalCount: z.number().int(),
  page: z.number().int(),
  pageSize: z.number().int(),
  parentFolderId: z.string().uuid().nullable().optional(),
  parentOfCurrentFolderId: z.string().uuid().nullable().optional(),
});
