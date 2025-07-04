import type { FileTypeBreakdown } from "../files/types";

export type CrateUsage = {
  totalUsedStorage: number;
  storageLimit: number;
  remainingStorage: number;
  breakdownByType: FileTypeBreakdown[];
};
