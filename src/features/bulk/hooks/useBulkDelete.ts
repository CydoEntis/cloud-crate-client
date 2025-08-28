import { useMutation } from "@tanstack/react-query";
import type { BulkItemRequest } from "../types/BulkItemRequest";

export const useBulkDelete = (crateId: string) =>
  useMutation({
    mutationFn: (payload: BulkItemRequest) => bulkDelete(crateId, payload),
  });