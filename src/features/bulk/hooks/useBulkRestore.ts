import { useMutation } from "@tanstack/react-query";

export const useBulkRestore = (crateId: string) =>
  useMutation({
    mutationFn: (payload: BulkItemRequest) => bulkRestore(crateId, payload),
  });
