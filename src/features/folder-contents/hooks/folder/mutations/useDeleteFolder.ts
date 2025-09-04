import { deleteFolder } from "@/features/folder-contents/api/folder";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId: string) => deleteFolder(folderId),
    onSuccess: (_data, folderId) => {
      queryClient.invalidateQueries({ queryKey: ["folderContents"], exact: false });
    },
  });
};
