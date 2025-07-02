import api from "@/lib/api";
import type { ApiResponse } from "../auth/types";
import { StoredFileListSchema } from "./schemas";
import type { StoredFile } from "./types";

export type UploadFileRequest = {
  crateId: string;
  file: File;
  folderId?: string;
  onProgress?: (percent: number) => void;
};

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

export const getFiles = async (crateId: string, folderId?: string | null): Promise<StoredFile[]> => {
  const endpoint = folderId ? `/crates/${crateId}/folders/${folderId}/files` : `/crates/${crateId}/files`;
  const response = await api.get<ApiResponse<StoredFile[]>>(endpoint);
  console.log("Files response data:", response.data.data);
  const filesData = response.data?.data ?? [];
  return StoredFileListSchema.parse(filesData);
};
