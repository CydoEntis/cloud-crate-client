import type { z } from "zod";
import type { crateSearchSchema, createCrateSchema, updateCrateSchema } from "./crateSchemas";
import type { Member } from "../members/memberTypes";
import type { FileTypeBreakdown } from "../folder-contents/file/fileTypes";

export type GetCrateParams = z.infer<typeof crateSearchSchema>;
export type CreateCrateRequest = z.infer<typeof createCrateSchema>;

export type UpdateCrateRequest = {
  name: string;
  color: string;
  storageAllocationGb?: number;
};

export type Crate = {
  id: string;
  name: string;
  color: string;
  owner: Member;
  UsedStorageBytes: number;
  AllocatedStorageBytes: number;
  joinedAt: Date;
};

export type CrateSummary = {
  id: string;
  name: string;
  color: string;
  owner: Member;
  usedStorageBytes: number;
  allocatedStorageBytes: number;
  joinedAt: Date;
};

export type CrateDetails = {
  id: string;
  name: string;
  color: string;
  allocatedStorageBytes: number;
  usedStorageBytes: number;
  remainingStorageBytes: number;
  currentMember: Member;
  breakdownByType: FileTypeBreakdown[];
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
  Owner = "Owner",
  Manager = "Manager",
  Member = "Member",
}
