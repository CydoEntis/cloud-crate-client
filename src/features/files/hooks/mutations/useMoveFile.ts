import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moveFile } from "../../api/moveFile";

export const useMoveFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, fileId, newParentId }: { crateId: string; fileId: string; newParentId: string | null }) =>
      moveFile(crateId, fileId, newParentId),

    onSuccess: (_, { crateId, newParentId }) => {
      const newKey = newParentId ?? "root";

      queryClient.invalidateQueries({ queryKey: ["files", crateId] });
      queryClient.invalidateQueries({ queryKey: ["files", crateId, newKey] });

      queryClient.invalidateQueries({ queryKey: ["folders", crateId] });
      queryClient.invalidateQueries({ queryKey: ["folders", crateId, newKey] });
    },
  });
};
