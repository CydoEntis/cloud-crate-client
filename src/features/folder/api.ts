import api from "@/lib/api";
import { z } from "zod";
import { FolderSchema, FolderListResponseSchema, MoveFolderRequestSchema } from "./schemas";
import type { ApiResponse } from "../auth/types";
import type { CreateFolderRequest, Folder, MoveFolderRequest } from "./types";

export const createFolder = async (crateId: string, data: CreateFolderRequest): Promise<Folder> => {
  const response = await api.post<ApiResponse<Folder>>(`/crates/${crateId}/folders`, data);
  return FolderSchema.parse(response.data.data);
};

export const getRootFolders = async (crateId: string): Promise<Folder[]> => {
  const response = await api.get<ApiResponse<Folder>>(`/crates/${crateId}/folders/root`);
  return FolderListResponseSchema.parse(response.data.data);
};

export const getSubfolders = async (parentId: string): Promise<Folder[]> => {
  const response = await api.get<ApiResponse<Folder>>(`/folders/${parentId}/subfolders`);
  return FolderListResponseSchema.parse(response.data.data);
};

export const renameFolder = async (folderId: string, newName: string): Promise<void> => {
  await api.put(`/folders/${folderId}/rename`, { newName });
};

export const deleteFolder = async (folderId: string): Promise<void> => {
  await api.delete(`/folders/${folderId}`);
};

export const moveFolder = async (folderId: string, newParentId: string | null): Promise<void> => {
  const payload: MoveFolderRequest = { newParentId };
  MoveFolderRequestSchema.parse(payload);
  await api.put(`/folders/${folderId}/move`, payload);
};
