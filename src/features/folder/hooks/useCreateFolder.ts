import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createFolder } from "../api/createFolder";
import type { CreateFolderArgs } from "../types";

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, data }: CreateFolderArgs) => createFolder(crateId, data),
    onSuccess: (_, { crateId, data }) => {
      const key = data.parentFolderId ?? "root"; // always use "root", never null

      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "folders" &&
          query.queryKey[1] === crateId &&
          query.queryKey[2] === key,
      });

      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "files" &&
          query.queryKey[1] === crateId &&
          query.queryKey[2] === key,
      });
    },
  });
};
