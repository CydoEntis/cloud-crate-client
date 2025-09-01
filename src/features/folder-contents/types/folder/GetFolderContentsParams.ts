export type GetFolderContentsParams = {
  page?: number;
  pageSize?: number;
  searchTerm?: string; 
  sortBy?: "Name" | "CreatedAt" | "Size";
  ascending?: boolean;
  searchSubfolders?: boolean;
};
