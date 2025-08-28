import { useMutation } from "@tanstack/react-query";
import type { BulkItemRequest } from "../types/BulkItemRequest";
import { bulkDelete } from "../api/bulkDelete";

export const useBulkDelete = (crateId: string) =>
  useMutation({
    mutationFn: (payload: BulkItemRequest) => bulkDelete(crateId, payload),
  });