import type { ApiResponse } from "@/features/auth/types";
import api from "@/lib/api";
import { FolderOrFileItemSchema } from "@/features/folder/schemas/FolderOrFileItemSchema";
import type { FolderOrFileItem } from "@/features/folder/types/FolderOrFileItem";

export const getFile = async (crateId: string, fileId: string): Promise<FolderOrFileItem> => {
  const response = await api.get<ApiResponse<unknown>>(
    `/crates/${crateId}/files/${fileId}`
  );

  const fileData = response.data?.value;
  console.log(fileData);

  // ✅ validate and coerce into correct type
  return FolderOrFileItemSchema.parse(fileData);
};
