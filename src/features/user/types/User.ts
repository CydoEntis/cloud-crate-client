import type { SubscriptionPlan } from "./SubscriptionPlan";

export type User = {
  id: string; 
  email: string;
  displayName: string;
  profilePictureUrl?: string;

  plan: SubscriptionPlan;

  maxStorageMb: number; 
  usedStorageMb: number; 
  createdAt: string;
  updatedAt: string;

  canCreateMoreCrates: boolean;
  crateCount: number;
};
