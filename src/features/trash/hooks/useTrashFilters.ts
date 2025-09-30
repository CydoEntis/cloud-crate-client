import { useCallback, useMemo } from "react";
import type { TrashFilters } from "../trashTypes";

export type UseTrashFiltersReturn = {
  filters: TrashFilters;
  sortByOptions: Array<{ value: string; label: string }>;
  handleSearchChange: (value: string) => void;
  handleSortByChange: (value: string) => void;
  handleSortOrderChange: (ascending: boolean) => void;
  handleResetFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
};

export const useTrashFilters = (
  currentFilters: TrashFilters,
  navigate: any // Change this from typed NavigateOptions
): UseTrashFiltersReturn => {
  const sortByOptions = useMemo(
    () => [
      { value: "Name", label: "Name" },
      { value: "DeletedAt", label: "Deleted Date" },
      { value: "Size", label: "Size" },
    ],
    []
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      navigate({
        search: (old: any) => ({
          ...old,
          search: value || undefined,
          page: 1,
        }),
      });
    },
    [navigate]
  );

  const handleSortByChange = useCallback(
    (value: string) => {
      navigate({
        search: (old: any) => ({
          ...old,
          sortBy: value,
          page: 1,
        }),
      });
    },
    [navigate]
  );

  const handleSortOrderChange = useCallback(
    (ascending: boolean) => {
      navigate({
        search: (old: any) => ({
          ...old,
          ascending,
          page: 1,
        }),
      });
    },
    [navigate]
  );

  const handleResetFilters = useCallback(() => {
    navigate({
      search: {
        sortBy: "DeletedAt",
        ascending: false,
        page: 1,
        pageSize: currentFilters.pageSize,
      },
    });
  }, [navigate, currentFilters.pageSize]);

  const hasActiveFilters = useMemo(() => {
    return (
      currentFilters.searchTerm !== "" || currentFilters.sortBy !== "DeletedAt" || currentFilters.ascending !== false
    );
  }, [currentFilters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (currentFilters.searchTerm !== "") count++;
    if (currentFilters.sortBy !== "DeletedAt" || currentFilters.ascending !== false) count++;
    return count;
  }, [currentFilters]);

  return {
    filters: currentFilters,
    sortByOptions,
    handleSearchChange,
    handleSortByChange,
    handleSortOrderChange,
    handleResetFilters,
    hasActiveFilters,
    activeFilterCount,
  };
};
