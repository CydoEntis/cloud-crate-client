import api from "@/lib/api";
import type { UploadFileRequest } from "../types";

export const uploadFile = async ({ crateId, file, folderId, onProgress }: UploadFileRequest) => {
  const formData = new FormData();
  formData.append("file", file);
  if (folderId) formData.append("folderId", folderId);

  const { data } = await api.post(`/crates/${crateId}/files`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (event) => {
      if (!event.total) return;
      const percent = Math.round((event.loaded * 100) / event.total);
      onProgress?.(percent);
    },
  });

  return data;
};
