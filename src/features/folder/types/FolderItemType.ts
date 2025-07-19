import type z from "zod";
import type { FolderOrFileItemSchema } from "../schemas/FolderOrFileItemSchema";

export enum FolderItemType {
  Folder = "Folder",
  File = "File",
}

export type DragItemType = "File" | "Folder";

export function mapFolderItemTypeToDragType(type: FolderItemType): DragItemType {
  return type;
}

