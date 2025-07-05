import type { ApiResponse } from "@/features/auth/types";
import type { StoredFile } from "../types";
import { StoredFileListSchema } from "../schemas";
import api from "@/lib/api";

export const getFiles = async (crateId: string, folderId?: string | null): Promise<StoredFile[]> => {
  const params = folderId ? { folderId } : {};
  const response = await api.get<ApiResponse<StoredFile[]>>(`/crates/${crateId}/files`, { params });
  const filesData = response.data?.data ?? [];
  return StoredFileListSchema.parse(filesData);
};
