import type { ApiResponse } from "@/features/auth/types";
import type { StoredFile } from "../types";
import api from "@/lib/api";
import { StoredFileSchema } from "../schemas/storedFileSchema";

export const getFile = async (crateId: string, fileId: string): Promise<StoredFile> => {
  const response = await api.get<ApiResponse<StoredFile>>(`/crates/${crateId}/files/${fileId}`);
  const fileData = response.data?.value;
  return StoredFileSchema.parse(fileData);
};
