export type GetUserCratesParams = {
  searchTerm?: string;
  sortBy?: "Name" | "JoinedAt" | "UsedStorage" | "Owned" | "Joined";
  orderBy?: "Asc" | "Desc";
  page?: number;
  pageSize?: number;
};
