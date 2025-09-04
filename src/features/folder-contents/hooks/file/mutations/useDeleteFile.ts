import { deleteFile } from "@/features/folder-contents/api/file/deleteFile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fileId, crateId }: { fileId: string; crateId: string }) => deleteFile(fileId, crateId),
    onSuccess: (_data, { crateId }) => {
      queryClient.invalidateQueries({ queryKey: ["folderContents", crateId], exact: false });
    },
  });
};
