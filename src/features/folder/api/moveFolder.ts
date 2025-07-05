import api from "@/lib/api";
import { MoveFolderRequestSchema } from "../schemas";
import type { MoveFolderRequest } from "../types";

export const moveFolder = async (folderId: string, newParentId: string | null): Promise<void> => {
  const payload: MoveFolderRequest = { newParentId };
  MoveFolderRequestSchema.parse(payload);
  await api.put(`/folders/${folderId}/move`, payload);
};
