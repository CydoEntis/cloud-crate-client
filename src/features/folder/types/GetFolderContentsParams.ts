export type GetFolderContentsParams = {
  page?: number;
  pageSize?: number;
  searchTerm?: string; 
  sortBy?: "Name" | "CreatedAt" | "Size";
  orderBy?: "Asc" | "Desc";
  searchSubfolders?: boolean;
};
