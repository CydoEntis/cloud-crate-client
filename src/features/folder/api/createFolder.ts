import api from "@/lib/api";
import type { CreateFolderRequest } from "../types/request/CreateFolderRequest";

export const createFolder = async (data: CreateFolderRequest): Promise<void> => {
  const payload = {
    crateId: data.crateId,
    name: data.name,
    color: data.color,
    parentFolderId: data.parentFolderId === "root" ? null : (data.parentFolderId ?? null),
  };

  console.log(payload);
  const d = await api.post(`/crates/${data.crateId}/folders`, payload);
  console.log(d);
};
