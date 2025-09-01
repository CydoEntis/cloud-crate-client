import { createFolder } from "@/features/folder-contents/api/folder";
import type { CreateFolder } from "@/features/folder-contents/types/folder/request/CreateFolder";
import { useQueryClient, useMutation } from "@tanstack/react-query";


export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFolder) => createFolder(data),
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
