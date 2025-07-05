import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createFolder } from "../api/createFolder";
import type { CreateFolderArgs } from "../types";

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, data }: CreateFolderArgs) => createFolder(crateId, data),
    onSuccess: (_, { crateId, data }) => {
      queryClient.invalidateQueries({ queryKey: ["folders", crateId, "root"] });

      if (data.parentFolderId) {
        queryClient.invalidateQueries({ queryKey: ["folders", crateId, "subfolders", data.parentFolderId] });
      }
    },
  });
};
