import { useMutation } from "@tanstack/react-query";
import type { BulkItemRequest } from "../types/BulkItemRequest";
import { bulkRestore } from "../api/bulkRestore";

export const useBulkRestore = (crateId: string) =>
  useMutation({
    mutationFn: (payload: BulkItemRequest) => bulkRestore(crateId, payload),
  });
