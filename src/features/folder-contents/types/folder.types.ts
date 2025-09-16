import type { z } from "zod";
import type { crateFolderSchema, createFolderSchema, moveFolderSchema } from "../schemas/folder.schemas";
import type { folderBreadcrumbSchema } from "../schemas/shared.schemas";

export type CreateFolder = z.infer<typeof createFolderSchema>;
export type MoveFolder = z.infer<typeof moveFolderSchema>;
export type CrateFolder = z.infer<typeof crateFolderSchema>;
export type FolderBreadcrumb = z.infer<typeof folderBreadcrumbSchema>;

export type GetFolderContentsParams = {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: "Name" | "CreatedAt" | "Size";
  ascending?: boolean;
  searchSubfolders?: boolean;
};
