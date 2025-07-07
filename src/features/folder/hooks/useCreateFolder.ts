import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createFolder } from "../api/createFolder";
import type { CreateFolderArgs } from "../types";

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, data }: CreateFolderArgs) => createFolder(crateId, data),
    onSuccess: (_, { crateId, data }) => {
      const parentFolderKey = data.parentFolderId ?? "root";

      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "folderContents" &&
          query.queryKey[1] === crateId &&
          query.queryKey[2] === parentFolderKey,
      });
    },
  });
};
