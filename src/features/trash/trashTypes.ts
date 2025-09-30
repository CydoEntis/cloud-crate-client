export type TrashItem = {
  id: string;
  name: string;
  type: "File" | "Folder";
  sizeInBytes: number | null;
  deletedAt: string;
  deletedByUserId: string;
  deletedByUserName: string;
  createdByUserId: string;
  createdByUserName: string;
  canRestore: boolean;
  canPermanentlyDelete: boolean;
  crateId: string;
  crateName: string;
};

export type TrashQueryParams = {
  crateId?: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: "Name" | "DeletedAt" | "Size";
  ascending?: boolean;
};

export type TrashFilters = {
  searchTerm: string;
  sortBy: string;
  ascending: boolean;
  page: number;
  pageSize: number;
};
