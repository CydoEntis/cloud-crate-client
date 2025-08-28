import { useMutation } from "@tanstack/react-query";
import type { BulkMoveRequest } from "../types/BulkMoveRequest";
import { bulkMove } from "../api/bulkMove";

export const useBulkMove = (crateId: string) =>
  useMutation({
    mutationFn: (payload: BulkMoveRequest) => bulkMove(crateId, payload),
  });
