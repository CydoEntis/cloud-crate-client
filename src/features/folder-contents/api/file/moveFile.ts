import apiService from "@/shared/lib/api/ApiClient";
import { MoveFileSchema } from "../../schemas/file/MoveFileSchema";
import type { MoveFile } from "../../types/file/MoveFile";

export const moveFile = async ({
  crateId,
  fileId,
  newParentId,
}: MoveFile & { crateId: string; fileId: string }): Promise<void> => {
  MoveFileSchema.parse({ newParentId });
  await apiService.put(`/crates/${crateId}/files/${fileId}/move`, { newParentId });
};
