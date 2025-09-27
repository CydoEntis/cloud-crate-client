export const adminUserSortByValues = ["Email", "DisplayName", "CreatedAt", "StorageUsed", "Plan"] as const;
export type AdminUserSortBy = (typeof adminUserSortByValues)[number];

export const adminUserSortByLabels: Record<AdminUserSortBy, string> = {
  Email: "Email",
  DisplayName: "Name", 
  CreatedAt: "Join Date",
  StorageUsed: "Storage Used",
  Plan: "Plan",
};

export const userTypeValues = ["All", "Admin", "User"] as const;
export type UserType = (typeof userTypeValues)[number];

export const userStatusValues = ["All", "Active", "Banned"] as const;
export type UserStatus = (typeof userStatusValues)[number];

export const planValues = ["All", "Free", "Mini", "Standard", "Max"] as const;
export type PlanFilter = (typeof planValues)[number];