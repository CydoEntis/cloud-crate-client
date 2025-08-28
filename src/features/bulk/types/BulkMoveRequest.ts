import type { BulkItemRequest } from "./BulkItemRequest";

export type BulkMoveRequest = {
  newParentId: string | null;
} & BulkItemRequest;
