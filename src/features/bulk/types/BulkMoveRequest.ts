import type { BulkItemRequest } from "./BulkItemRequest";

export type BulkMoveRequest = {
  crateId: string;
  sourceFolderId: string | null;
  newParentId: string | null;
} & BulkItemRequest;
