import type { z } from "zod";
import type { crateFolderSchema, createFolderSchema, moveFolderSchema } from "../folder/folderSchema";
import type { folderBreadcrumbSchema } from "../sharedSchema";

export type CreateFolder = z.infer<typeof createFolderSchema>;
export type MoveFolder = z.infer<typeof moveFolderSchema>;
export type CrateFolder = z.infer<typeof crateFolderSchema>;
export type FolderBreadcrumb = z.infer<typeof folderBreadcrumbSchema>;

export type FolderResponse = {
  id: string;
  name: string;
  crateId: string;
  parentFolderId: string | null;
  color: string;
  uploadedByUserId: string;
  uploadedByDisplayName: string;
  uploadedByEmail: string;
  uploadedByProfilePictureUrl: string;
  createdAt: string;
};

export type GetAvailableMoveTargetsRequest = {
  crateId: string;
  excludeFolderId?: string;
  currentFolderId?: string | null;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
  ascending?: boolean;
};



export type GetFolderContentsParams = {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: "Name" | "CreatedAt" | "Size";
  ascending?: boolean;
  searchSubfolders?: boolean;
};

export type UpdateFolderRequest = {
  folderId: string;
  newName?: string;
  newColor?: string;
};
