import apiService from "@/shared/lib/api/ApiClient";
import type { CreateFolder } from "../../types/folder/request/CreateFolder";

export const createFolder = async (data: CreateFolder): Promise<void> => {
  if (!data.parentFolderId) {
    throw new Error("parentFolderId is required for folder creation");
  }

  const payload = {
    crateId: data.crateId,
    name: data.name,
    color: data.color,
    parentFolderId: data.parentFolderId, 
  };

  await apiService.post(`/crates/${data.crateId}/folders`, payload);
};
