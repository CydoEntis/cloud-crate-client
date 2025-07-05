import { useMutation } from "@tanstack/react-query";
import type { UploadFileRequest } from "../types";
import { uploadFile } from "../api";

export const useUploadFile = () =>
  useMutation({
    mutationFn: (params: UploadFileRequest) => uploadFile(params),
    onSuccess: () => {
      // TODO: Invalidate crate files
    },
    onError: (err) => {
      console.error("Upload failed", err);
    },
  });
