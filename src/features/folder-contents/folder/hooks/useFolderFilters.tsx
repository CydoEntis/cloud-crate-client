import { useMemo, useCallback } from "react";
import { Route } from "@/routes/(protected)/crates/$crateId/folders/$folderId"; 
import { allowedOrderByValues, orderByLabels, type OrderBy } from "@/features/folder-contents/sharedTypes";

type RouteSearch = ReturnType<typeof Route.useSearch>;
type NavigateFunction = ReturnType<typeof Route.useNavigate>;

export interface FolderFilterState {
  searchTerm: string;
  orderBy: string;
  ascending: boolean;
  page: number;
  pageSize: number;
}

type UpdateFilterFn = (partial: Partial<RouteSearch>) => void;

export interface UseFolderFiltersReturn {
  filters: FolderFilterState;
  sortByOptions: Array<{ value: string; label: string }>;
  handleSearchChange: (value: string) => void;
  handleSortByChange: (value: string) => void;
  handleSortOrderChange: (ascending: boolean) => void;
  handleResetFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

export function useFolderFilters(
  currentFilters: FolderFilterState,
  navigate: NavigateFunction
): UseFolderFiltersReturn {
  const updateFilter = useCallback<UpdateFilterFn>(
    (partial: Partial<RouteSearch>) => {
      navigate({
        search: (old) => ({ ...old, ...partial }),
      });
    },
    [navigate]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      updateFilter({ search: value, page: 1 });
    },
    [updateFilter]
  );

  const handleSortByChange = useCallback(
    (value: string) => {
      if (allowedOrderByValues.includes(value as OrderBy)) {
        updateFilter({ orderBy: value as OrderBy, page: 1 });
      } else {
        console.warn(`Invalid sort by value received: ${value}`);
      }
    },
    [updateFilter]
  );

  const handleSortOrderChange = useCallback(
    (ascending: boolean) => {
      updateFilter({ ascending, page: 1 });
    },
    [updateFilter]
  );

  const handleResetFilters = useCallback(() => {
    updateFilter({
      search: "",
      orderBy: "Name",
      ascending: false,
      page: 1,
    });
  }, [updateFilter]);

  const sortByOptions = useMemo(
    () =>
      allowedOrderByValues.map((val) => ({
        value: val,
        label: orderByLabels[val],
      })),
    []
  );

  const hasActiveFilters = useMemo(() => {
    return currentFilters.searchTerm !== "" || currentFilters.orderBy !== "Name" || currentFilters.ascending !== false;
  }, [currentFilters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (currentFilters.searchTerm !== "") count++;
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
}
