import { useMutation } from "@tanstack/react-query";

export const useBulkDelete = (crateId: string) =>
  useMutation({
    mutationFn: (payload: BulkItemRequest) => bulkDelete(crateId, payload),
  });