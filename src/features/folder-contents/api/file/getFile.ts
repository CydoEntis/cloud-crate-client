import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";
import type { CrateFile } from "../../types/file/CrateFile";
import { crateFileSchema } from "../../schemas/file/CrateFileSchema";


export const getFile = async (crateId: string, fileId: string): Promise<CrateFile> => {
  const response = await api.get<ApiResponse<CrateFile>>(`/crates/${crateId}/files/${fileId}`);

  const fileData = response.data?.value;
  if (!fileData) {
    throw new Error("File not found in API response");
  }
  return crateFileSchema.parse(fileData);
};
