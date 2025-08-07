export type GetUserCratesParams = {
  searchTerm?: string;
  sortBy?: "Name" | "JoinedAt" | "UsedStorage";
  orderBy?: "Asc" | "Desc";
  page?: number;
  pageSize?: number;
  memberType?: "All" | "Owner" | "Joined";
};
