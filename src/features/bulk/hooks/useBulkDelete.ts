import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { BulkItemRequest } from "../types/BulkItemRequest";
import { bulkDelete } from "../api/bulkDelete";

export const useBulkDelete = (crateId: string, folderId?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BulkItemRequest) => bulkDelete(crateId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folderContents", crateId, folderId ?? "root"],
      });
    },
  });
};