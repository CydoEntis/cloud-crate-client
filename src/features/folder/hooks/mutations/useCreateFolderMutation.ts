import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createFolder } from "../../api/createFolder";
import type { CreateFolderRequest } from "../../types";

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFolderRequest) => createFolder(data),
    onSuccess: (result, data) => {
      const parentFolderKey = data.parentFolderId ?? "root";

      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "folderContents" &&
          query.queryKey[1] === data.crateId &&
          query.queryKey[2] === parentFolderKey,
      });
    },
  });
};
