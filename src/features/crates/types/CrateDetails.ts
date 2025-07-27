import type { FileTypeBreakdown } from "@/features/files/types/FileTypeBreakdown";
import type { CrateRole } from "@/features/invites/types/CrateRole";

export type CrateDetails = {
  id: string;
  name: string;
  role: CrateRole,
  color: string;
  totalUsedStorage: number;
  storageLimit: number;
  breakdownByType: FileTypeBreakdown[];
  remainingStorage: number;
};
