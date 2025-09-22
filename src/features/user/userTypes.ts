import type z from "zod";
import type { uploaderSchema } from "./userSchemas";

export type User = {
  id: string;
  email: string;
  displayName: string;
  accountStorageLimitBytes: number;
  allocatedStorageBytes: number;
  remainingAllocationBytes: number;
  remainingUsageBytes: number;
  usedStorageBytes: number;
  createdAt: string;
  updatedAt: string;
  profilePictureUrl?: string;
  isAdmin: boolean;
};

export type Uploader = z.infer<typeof uploaderSchema>;
