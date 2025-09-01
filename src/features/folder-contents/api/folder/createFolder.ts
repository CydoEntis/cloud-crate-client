import api from "@/lib/api";
import type { CreateFolder } from "../../types/folder/request/CreateFolder";

export const createFolder = async (data: CreateFolder): Promise<void> => {
  const payload = {
    crateId: data.crateId,
    name: data.name,
    color: data.color,
    parentFolderId: data.parentFolderId === "root" ? null : (data.parentFolderId ?? null),
  };

  await api.post(`/crates/${data.crateId}/folders`, payload);
};
