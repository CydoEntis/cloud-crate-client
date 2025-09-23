import type { AdminUserSortBy, PlanFilter, UserStatus, UserType } from "./utils/adminUserConstants";

export type AdminUser = {
  id: string;
  email: string;
  displayName: string;
  profilePictureUrl?: string;
  createdAt: string;
  plan: string;
  usedStorageBytes: number;
  isAdmin: boolean;
  isLocked: boolean;
  lockoutEnd?: string;
};

export type AdminUserSearchParams = {
  searchTerm?: string;
  sortBy?: AdminUserSortBy;
  ascending?: boolean;
  page?: number;
  pageSize?: number;
  userType?: UserType;
  userStatus?: UserStatus;
  planFilter?: PlanFilter;
};

export type AdminUsersResponse = {
  items: AdminUser[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type AdminStats = {
  totalUsers: number;
  adminUsers: number;
  lockedUsers: number;
  activeUsers: number;
  totalStorageUsed: number;
  lastUserRegistered?: string;
  usersByPlan: Record<string, number>;
};

export type CreateInviteRequest = {
  email: string;
  isAdmin?: boolean;
};

export enum SubscriptionPlan {
  Free = "Free",
  Mini = "Mini",
  Standard = "Standard",
  Max = "Max",
}
