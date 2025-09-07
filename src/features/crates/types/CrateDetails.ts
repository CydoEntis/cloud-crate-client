import type { FileTypeBreakdown } from "@/features/folder-contents/types/file";
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
  rootFolderId: string;
};
