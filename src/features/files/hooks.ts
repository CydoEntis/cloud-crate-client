import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import type { UploadFileInput } from "./types";

type UploadFileRequest = UploadFileInput & {
  crateId: string;
};

export const uploadFile = async ({ crateId, file, folderId }: UploadFileRequest) => {
  const formData = new FormData();
  formData.append("file", file);
  if (folderId) formData.append("folderId", folderId);

  const response = await api.post(`/crates/${crateId}/files`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const useUploadFile = () =>
  useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      // TODO: Invalidate crate files once implemented
    },
    onError: (err) => {
      console.error("Upload failed", err);
    },
  });
