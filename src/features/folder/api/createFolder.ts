import api from "@/lib/api";
import type { CreateFolderRequest } from "../types";

export const createFolder = async (crateId: string, data: CreateFolderRequest): Promise<void> => {
  const payload = {
    ...data,
    parentFolderId: data.parentFolderId === "root" ? null : data.parentFolderId,
  };

  await api.post(`/crates/${crateId}/folders`, payload);
};
