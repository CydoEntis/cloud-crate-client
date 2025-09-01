import type { ApiResponse } from "@/features/auth/types";
import api from "@/lib/api";
import type { CrateFile } from "../../types/file/CrateFile";
import { CrateFileListSchema } from "../../schemas/file/CrateFileListSchema";

export const getFiles = async (crateId: string, folderId?: string | null): Promise<CrateFile[]> => {
  const params = folderId ? { folderId } : {};
  const response = await api.get<ApiResponse<CrateFile[]>>(`/crates/${crateId}/files`, { params });
  const filesData = response.data?.value ?? [];
  return CrateFileListSchema.parse(filesData);
};
