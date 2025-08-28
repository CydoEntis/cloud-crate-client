import { useMutation } from "@tanstack/react-query";
import { bulkDelete, bulkMove, bulkRestore } from "../api/bulk.api";

export type BulkItemRequest = {
  fieldIds: string[];
  folderIds: string[];
}


export type BulkMoveRequest = {
  newParentId: string | null;
} & BulkItemRequest;






