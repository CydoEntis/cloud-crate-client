import type { FileTypeBreakdown } from "@/features/files/types/FileTypeBreakdown";

export type CrateDetails = {
  id: string;
  name: string;
  color: string;
  totalUsedStorage: number;
  storageLimit: number;
  breakdownByType: FileTypeBreakdown[];
  remainingStorage: number;
};
