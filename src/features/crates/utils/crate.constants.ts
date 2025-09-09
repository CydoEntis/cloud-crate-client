export const allowedSortByValues = ["Name", "JoinedAt", "UsedStorage"] as const;
export const allowedMemberTypes = ["All", "Owner", "Joined"] as const;

export const sortByLabels: Record<(typeof allowedSortByValues)[number], string> = {
  Name: "Crate Name",
  JoinedAt: "Join Date",
  UsedStorage: "Used Storage",
};
