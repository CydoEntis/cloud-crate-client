import api from "@/lib/api";
import type { CreateFolderRequest } from "../types";

export const createFolder = async (data: CreateFolderRequest): Promise<void> => {
  const payload = {
    ...data,
    parentFolderId: data.parentFolderId === "root" ? null : data.parentFolderId,
  };

  await api.post(`/crates/${data.crateId}/folders`, payload);
};
