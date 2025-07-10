import api from "@/lib/api";
import { MoveFileRequestSchema } from "../schemas";
import type { MoveFileRequest } from "../types";

export const moveFile = async (crateId: string, fileId: string, newParentId: string | null): Promise<void> => {
  const payload: MoveFileRequest = { newParentId };
  MoveFileRequestSchema.parse(payload);
  await api.put(`/crates/${crateId}/files/${fileId}/move`, payload);
};
