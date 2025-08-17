import type { ApiResponse } from "@/features/auth";
import api from "@/lib/api";
import { StoredFileSchema } from "../schemas/StoredFileSchema";
import type { StoredFile } from "../types";

export const getFile = async (crateId: string, fileId: string): Promise<StoredFile> => {
  const response = await api.get<ApiResponse<StoredFile>>(`/crates/${crateId}/files/${fileId}`);

  const fileData = response.data?.value;
  if (!fileData) {
    throw new Error("File not found in API response");
  }
  console.log("RETRIEVED FILE: ", fileData);
  return StoredFileSchema.parse(fileData);
};
