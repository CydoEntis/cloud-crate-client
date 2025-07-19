import api from "@/lib/api";
import type { MoveFileRequest } from "../types";
import { MoveFileRequestSchema } from "../schemas/MoveFileRequestSchema";

export const moveFile = async (crateId: string, fileId: string, newParentId: string | null): Promise<void> => {
  const payload: MoveFileRequest = { newParentId };
  MoveFileRequestSchema.parse(payload);
  await api.put(`/crates/${crateId}/files/${fileId}/move`, payload);
};
