import { useState } from "react";
import type { MemberQueryParameters } from "../memberTypes";
import { useGetMembers } from "../api/memberQueries";

export const usePaginatedMembersModal = (crateId: string, initialPageSize: number = 10) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [searchTerm, setSearchTerm] = useState("");

  const queryParams: MemberQueryParameters = {
    page,
    pageSize,
    ...(searchTerm && { searchTerm }),
  };

  const result = useGetMembers(crateId, queryParams);

  const resetPagination = () => {
    setPage(1);
    setSearchTerm("");
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  return {
    ...result,
    page,
    pageSize,
    searchTerm,
    setPage,
    setPageSize,
    handleSearch,
    resetPagination,
    totalPages: result.data ? Math.ceil(result.data.totalCount / pageSize) : 0,
  };
};
