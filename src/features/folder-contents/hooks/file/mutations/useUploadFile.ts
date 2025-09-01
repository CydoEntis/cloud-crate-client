import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile, type SingleUploadFile } from "@/features/folder-contents/api/file";

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SingleUploadFile) => uploadFile(params),
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
    onError: (err) => console.error("Upload failed", err),
  });
};
