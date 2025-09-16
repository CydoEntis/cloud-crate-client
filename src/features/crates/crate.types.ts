import type { z } from "zod";

import type { crateSearchSchema, createCrateSchema, updateCrateSchema } from "./crate.schemas";
import type { Member } from "../members/member.types";
import type { FileTypeBreakdown } from "../folder-contents/types/file.types";

export type GetCrateParams = z.infer<typeof crateSearchSchema>;
export type CreateCrateRequest = z.infer<typeof createCrateSchema>;
export type UpdateCrateRequest = z.infer<typeof updateCrateSchema>;

export type Crate = {
  id: string;
  name: string;
  color: string;
  owner: Member;
  usedStorageBytes: number;
  totalStorageBytes: number;
  joinedAt: Date;
};

export type CrateDetails = {
  id: string;
  name: string;
  role: CrateRole;
  color: string;
  totalUsedStorage: number;
  storageLimit: number;
  breakdownByType: FileTypeBreakdown[];
  remainingStorage: number;
  rootFolderId: string;
};

export type UserCratesResponse = {
  owned: Crate[];
  joined: Crate[];
};

export type StorageDetails = {
  usedStorageBytes: number;
  accountStorageLimitBytes: number;
};

export enum CrateRole {
  Owner = "Owner", // Full control, including deleting the crate
  Editor = "Editor", // Can upload/download/delete files
  Viewer = "Viewer", // Read-only access
}
