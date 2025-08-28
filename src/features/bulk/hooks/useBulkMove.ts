import { useMutation } from "@tanstack/react-query";
import { bulkMove } from "../api/bulk.api";

export const useBulkMove = (crateId: string) =>
  useMutation({
    mutationFn: (payload: BulkMoveRequest) =>
      bulkMove(crateId, payload),
  });