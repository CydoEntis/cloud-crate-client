import type { BulkItemRequest } from "./BulkItemRequest";

export type BulkMoveRequest = {
  crateId: string;
  newParentId: string | null;
} & BulkItemRequest;
