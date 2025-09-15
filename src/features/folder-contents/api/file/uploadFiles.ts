import apiService from "@/shared/lib/api/ApiClient";
import type { MultiUploadFile } from "../../types/file/MultiUploadFile";

export const uploadFiles = async ({ crateId, folderId, files, onProgress }: MultiUploadFile) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  if (folderId) formData.append("folderId", folderId);

  const { data } = await apiService.post(`/crates/${crateId}/files/upload-multiple`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (event) => {
      if (!event.total) return;
      const percent = Math.round((event.loaded * 100) / event.total);
      onProgress?.(percent);
    },
  });

  return data;
};
