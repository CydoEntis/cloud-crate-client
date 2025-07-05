import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";
import { FolderListResponseSchema } from "../schemas";
import type { Folder } from "../types";

export const getRootFolders = async (crateId: string): Promise<Folder[]> => {
  const response = await api.get<ApiResponse<Folder>>(`/crates/${crateId}/folders/root`);
  return FolderListResponseSchema.parse(response.data.data);
};
