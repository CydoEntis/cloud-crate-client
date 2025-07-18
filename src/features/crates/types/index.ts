import type z from "zod";
import type { createCrateSchema, updateCrateSchema } from "../schemas";
import type { FileTypeBreakdown } from "@/features/files/types";

export type CreateCrateRequest = z.infer<typeof createCrateSchema>;

export type Crate = {
  id: string;
  name: string;
  color: string;
};

export type CrateDetailsResponse = {
  id: string;
  name: string;
  color: string;
  totalUsedStorage: number;
  storageLimit: number;
  breakdownByType: FileTypeBreakdown[];
  remainingStorage: number;
};

export type UpdateCrateRequest = z.infer<typeof updateCrateSchema>;

export type CrateResponse = {
  id: string;
  name: string;
  color: string;
};


