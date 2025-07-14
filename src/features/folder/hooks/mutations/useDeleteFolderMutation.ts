import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteFolder } from "../api/deleteFolder";

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (folderId: string) => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
};
