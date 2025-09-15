import type { ApiResponse } from "@/features/auth";
import type { CrateFile } from "../../types/file/CrateFile";
import { crateFileSchema } from "../../schemas/file/CrateFileSchema";
import apiService from "@/shared/lib/api/ApiClient";


export const getFile = async (crateId: string, fileId: string): Promise<CrateFile> => {
  const response = await apiService.get<ApiResponse<CrateFile>>(`/crates/${crateId}/files/${fileId}`);

  const fileData = response.data?.data;
  if (!fileData) {
    throw new Error("File not found in API response");
  }
  return crateFileSchema.parse(fileData);
};
