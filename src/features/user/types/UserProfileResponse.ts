import type { SubscriptionPlan } from "./SubscriptionPlan";

export type UserProfileResponse = {
  userId: string;
  email: string;
  plan: SubscriptionPlan;
  totalStorageMb: number;
  usedStorageMb: number;
  canCreateMoreCrates: boolean;
  crateLimit: number;
  crateCount: number;
};
