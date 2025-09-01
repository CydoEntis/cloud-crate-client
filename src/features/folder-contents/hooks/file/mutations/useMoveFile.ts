import { moveFile } from "@/features/folder-contents/api/file/moveFile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMoveFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { crateId: string; fileId: string; newParentId: string | null }) => moveFile(params),

    onSuccess: (_, { crateId, newParentId }) => {
      const parentKey = newParentId ?? "root";

      queryClient.invalidateQueries({ queryKey: ["folderContents", crateId, parentKey] });
    },
  });
};
