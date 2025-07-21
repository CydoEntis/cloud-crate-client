import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UploadFileRequest } from "../../types";
import { uploadFile } from "../../api";

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UploadFileRequest) => uploadFile(params),
    onSuccess: (_, variables) => {
      const parentFolderKey = variables.folderId ?? "root";

      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "folderContents" &&
          query.queryKey[1] === variables.crateId &&
          query.queryKey[2] === parentFolderKey,
      });
    },
    onError: (err) => {
      console.error("Upload failed", err);
    },
  });
};
