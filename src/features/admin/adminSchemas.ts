import { z } from "zod";

export const adminUserSortByValues = ["createdAt", "email", "displayName", "plan"] as const;
export const userTypeValues = ["All", "Admin", "User"] as const;
export const userStatusValues = ["All", "Active", "Banned"] as const;
export const planFilterValues = ["All", "Free", "Premium", "Max"] as const;

export type AdminUserSortBy = typeof adminUserSortByValues[number];
export type UserType = typeof userTypeValues[number];
export type UserStatus = typeof userStatusValues[number];
export type PlanFilter = typeof planFilterValues[number];

export function isAdminUserSortBy(value: string): value is AdminUserSortBy {
  return adminUserSortByValues.includes(value as AdminUserSortBy);
}

export function isUserType(value: string): value is UserType {
  return userTypeValues.includes(value as UserType);
}

export function isUserStatus(value: string): value is UserStatus {
  return userStatusValues.includes(value as UserStatus);
}

export function isPlanFilter(value: string): value is PlanFilter {
  return planFilterValues.includes(value as PlanFilter);
}

export const adminUserSearchSchema = z.object({
  searchTerm: z.string().optional(),
  sortBy: z.enum(adminUserSortByValues).optional().default("createdAt"),
  ascending: z.boolean().optional().default(false),
  page: z.coerce.number().min(1).optional().default(1),
  pageSize: z.coerce.number().min(1).max(100).optional().default(10),
  userType: z.enum(userTypeValues).optional().default("All"),
  userStatus: z.enum(userStatusValues).optional().default("All"),
  planFilter: z.enum(planFilterValues).optional().default("All"),
});

export const adminUserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  displayName: z.string(),
  profilePicture: z.string().optional(),
  isAdmin: z.boolean(),
  isBanned: z.boolean(),
  plan: z.enum(["Free", "Premium", "Max"]),
  storageUsed: z.number(),
  storageLimit: z.number(),
  createdAt: z.string(),
  lastLogin: z.string().optional(),
});

export const adminBatchActionSchema = z.object({
  userIds: z.array(z.string()).min(1),
  action: z.enum(["ban", "unban", "makeAdmin", "removeAdmin", "updatePlan"]),
  planType: z.enum(["Free", "Premium", "Max"]).optional(),
});