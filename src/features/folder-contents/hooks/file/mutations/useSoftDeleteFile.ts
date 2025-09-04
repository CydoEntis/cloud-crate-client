import { softDeleteFile } from "@/features/folder-contents/api/file/useSoftDelete";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSoftDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ fileId, crateId }: { fileId: string; crateId: string }) => softDeleteFile(fileId, crateId),
    onSuccess: (_data, { crateId }) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "folderContents" && query.queryKey[1] === crateId,
      });
    },
  });
};
