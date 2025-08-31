import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BulkMoveRequest } from "../types/BulkMoveRequest";
import { bulkMove } from "../api/bulkMove";

export const useBulkMove = (crateId: string, folderId?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BulkMoveRequest) => bulkMove(crateId, payload),
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["folderContents", crateId, payload.sourceFolderId ?? folderId ?? "root"],
      });

      if (payload.newParentId) {
        queryClient.invalidateQueries({
          queryKey: ["folderContents", crateId, payload.newParentId],
        });
      }
    },
  });
};
