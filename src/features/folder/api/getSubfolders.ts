import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";
import { FolderListResponseSchema } from "../schemas";
import type { Folder } from "../types";

export const getSubfolders = async (crateId: string, parentId: string): Promise<Folder[]> => {
  const response = await api.get<ApiResponse<Folder[]>>(`/crates/${crateId}/folders/${parentId}/subfolders`);
  return FolderListResponseSchema.parse(response.data.data);
};
