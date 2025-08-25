import { useMutation } from "@tanstack/react-query";
import { bulkDelete, bulkMove, bulkRestore } from "../api/bulk.api";

export type BulkItemRequest = {
  fieldIds: string[];
  folderIds: string[];
}


export type BulkMoveRequest = {
  newParentId: string | null;
} & BulkItemRequest;

export const useBulkMove = (crateId: string) =>
  useMutation({
    mutationFn: (payload: BulkMoveRequest) =>
      bulkMove(crateId, payload),
  });

export const useBulkDelete = (crateId: string) =>
  useMutation({
    mutationFn: (payload: BulkItemRequest) => bulkDelete(crateId, payload),
  });

export const useBulkRestore = (crateId: string) =>
  useMutation({
    mutationFn: (payload: BulkItemRequest) => bulkRestore(crateId, payload),
  });
