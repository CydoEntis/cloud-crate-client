import { deleteFolder } from "@/features/folder-contents/api/folder";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, folderId }: { crateId: string; folderId: string }) => deleteFolder(crateId, folderId),
    onSuccess: (_data, folderId) => {
      queryClient.invalidateQueries({ queryKey: ["folderContents"], exact: false });
    },
  });
};
