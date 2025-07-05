import type { ApiResponse } from "@/features/auth";
import type { CreateFolderRequest, Folder } from "../types";
import { FolderSchema } from "../schemas";
import api from "@/lib/api";

export const createFolder = async (crateId: string, data: CreateFolderRequest): Promise<Folder> => {
  const response = await api.post<ApiResponse<Folder>>(`/crates/${crateId}/folders`, data);
  return FolderSchema.parse(response.data.data);
};
