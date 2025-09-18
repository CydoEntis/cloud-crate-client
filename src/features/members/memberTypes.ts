import type { CrateRole } from "../crates/crateTypes";

export type Member = {
  userId: string;
  email: string;
  displayName: string;
  profilePicture: string;
  role: CrateRole;
  joinedAt: string | Date;
};

export type MemberQueryParameters = {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: "DisplayName" | "Email" | "Role" | "JoinedAt";
  ascending?: boolean;
  filterByRole?: CrateRole;
  recentOnly?: boolean;
  limit?: number;
};
