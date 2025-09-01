import api from "@/lib/api";

export type SingleUploadFile = {
  crateId: string;
  folderId?: string;
  file: File;
  onProgress?: (percent: number) => void;
};

export const uploadFile = async ({ crateId, folderId, file, onProgress }: SingleUploadFile) => {
  const formData = new FormData();
  formData.append("file", file);
  if (folderId) formData.append("folderId", folderId);

  const { data } = await api.post(`/crates/${crateId}/files`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (event) => {
      if (!event.total) return;
      const percent = Math.round((event.loaded * 100) / event.total);
      onProgress?.(percent);
    },
  });

  return data;
};
