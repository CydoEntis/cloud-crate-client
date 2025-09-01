import { moveFolder } from "@/features/folder-contents/api/folder";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMoveFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      crateId,
      folderId,
      newParentId,
    }: {
      crateId: string;
      folderId: string;
      newParentId: string | null;
    }) => moveFolder(crateId, folderId, newParentId),
    onSuccess: (_, { crateId, newParentId }) => {
      const newKey = newParentId ?? "root";

      queryClient.invalidateQueries({ queryKey: ["folders", crateId] });
      queryClient.invalidateQueries({ queryKey: ["folders", crateId, newKey] });

      queryClient.invalidateQueries({ queryKey: ["files", crateId] });
      queryClient.invalidateQueries({ queryKey: ["files", crateId, newKey] });
    },
  });
};
