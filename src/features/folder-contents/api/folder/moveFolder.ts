import apiService from "@/shared/lib/api/ApiClient";
import { MoveFolderSchema } from "../../schemas/folder/MoveFolderSchema";
import type { MoveFolder } from "../../types/folder/request/MoveFolder";


export const moveFolder = async (crateId: string, folderId: string, newParentId: string | null): Promise<void> => {
  const payload: MoveFolder = { newParentId };
  MoveFolderSchema.parse(payload);
  await apiService.put(`/crates/${crateId}/folders/${folderId}/move`, payload);
};
