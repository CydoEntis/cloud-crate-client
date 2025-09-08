export type GetCrateParams = {
  searchTerm?: string;
  sortBy?: "Name" | "JoinedAt" | "UsedStorage";
  ascending?: boolean;
  page?: number;
  pageSize?: number;
  memberType?: "All" | "Owner" | "Joined";
};
