import type z from "zod";
import type {
  CreateFolderRequestSchema,
  FolderContentsResponseSchema,
  FolderOrFileItemSchema,
  FolderSchema,
  MoveFolderRequestSchema,
} from "../schemas";

export type Folder = z.infer<typeof FolderSchema>;

export type CreateFolderRequest = z.infer<typeof CreateFolderRequestSchema>;

export type MoveFolderRequest = z.infer<typeof MoveFolderRequestSchema>;

export type CreateFolderArgs = {
  crateId: string;
  data: CreateFolderRequest;
};

export type FolderOrFileItem = z.infer<typeof FolderOrFileItemSchema>;
export type FolderContentsResponse = z.infer<typeof FolderContentsResponseSchema>;

export enum FolderItemType {
  Folder = "Folder",
  File = "File",
}