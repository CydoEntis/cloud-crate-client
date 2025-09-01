import api from "@/lib/api";
import { MoveFileSchema } from "../../schemas/file/MoveFileSchema";
import type { MoveFile } from "../../types/file/MoveFile";

export const moveFile = async ({
  crateId,
  fileId,
  newParentId,
}: MoveFile & { crateId: string; fileId: string }): Promise<void> => {
  MoveFileSchema.parse({ newParentId });
  await api.put(`/crates/${crateId}/files/${fileId}/move`, { newParentId });
};
