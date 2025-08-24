import { useMutation } from "@tanstack/react-query";
import { bulkDelete, bulkMove, bulkRestore } from "../api/bulk.api";

export const useBulkMove = (crateId: string) =>
  useMutation({
    mutationFn: (payload: { fileIds: string[]; folderIds: string[]; newParentId: string | null }) =>
      bulkMove(crateId, payload),
  });

export const useBulkDelete = (crateId: string) =>
  useMutation({
    mutationFn: (payload: { fileIds: string[]; folderIds: string[] }) => bulkDelete(crateId, payload),
  });

export const useBulkRestore = (crateId: string) =>
  useMutation({
    mutationFn: (payload: { fileIds: string[]; folderIds: string[] }) => bulkRestore(crateId, payload),
  });
