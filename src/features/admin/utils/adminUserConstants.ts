export const adminUserSortByValues = ["email", "displayName", "createdAt", "plan"] as const;
export type AdminUserSortBy = (typeof adminUserSortByValues)[number];

export const adminUserSortByLabels: Record<AdminUserSortBy, string> = {
  email: "Email",
  displayName: "Name",
  createdAt: "Join Date",
  plan: "Plan",
};

export const userTypeValues = ["All", "Admin", "User"] as const;
export type UserType = (typeof userTypeValues)[number];

export const userStatusValues = ["All", "Active", "Banned"] as const;
export type UserStatus = (typeof userStatusValues)[number];

export const planValues = ["All", "Free", "Premium", "Max"] as const;
export type PlanFilter = (typeof planValues)[number];
