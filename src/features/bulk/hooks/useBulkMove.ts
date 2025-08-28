import { useMutation } from "@tanstack/react-query";
import { bulkMove } from "../api/bulk.api";
import type { BulkMoveRequest } from "../types/BulkMoveRequest";

export const useBulkMove = (crateId: string) =>
  useMutation({
    mutationFn: (payload: BulkMoveRequest) =>
      bulkMove(crateId, payload),
  });