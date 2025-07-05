import api from "@/lib/api";
import { MoveFolderRequestSchema } from "../schemas";
import type { MoveFolderRequest } from "../types";

export const moveFolder = async (crateId: string, folderId: string, newParentId: string | null): Promise<void> => {
  const payload: MoveFolderRequest = { newParentId };
  MoveFolderRequestSchema.parse(payload);
  await api.put(`/crates/${crateId}/folders/${folderId}/move`, payload);
};
