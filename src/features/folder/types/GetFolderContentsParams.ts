export type GetFolderContentsParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: "Name" | "CreatedAt" | "Size";
  orderBy?: "Asc" | "Desc";
  searchSubfolders?: boolean;
};