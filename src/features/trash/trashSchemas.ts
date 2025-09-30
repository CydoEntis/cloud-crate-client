import { z } from "zod";

export const trashSearchSchema = z.object({
  search: z.string().optional(),
  sortBy: z.enum(["Name", "DeletedAt", "Size"]).optional().default("DeletedAt"),
  ascending: z.boolean().optional().default(false),
  page: z.number().int().positive().optional().default(1),
  pageSize: z.number().int().positive().optional().default(20),
});

export const trashItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  type: z.enum(["File", "Folder"]),
  sizeInBytes: z.number().nullable(),
  deletedAt: z.string().datetime(),
  deletedByUserId: z.string(),
  deletedByUserName: z.string(),
  createdByUserId: z.string(),
  createdByUserName: z.string(),
  canRestore: z.boolean(),
  canPermanentlyDelete: z.boolean(),
});