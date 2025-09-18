export type PaginatedResult<T> = {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type ApiResponse<T> = {
  isSuccess: boolean;
  data: T | null;
  message?: string;
  statusCode: number;
  errors?: ApiError[];
  timestamp: string;
};

export type ApiError = { code: string; message: string };
