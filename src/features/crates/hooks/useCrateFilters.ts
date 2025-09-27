import { useMemo, useCallback } from "react";
import { Route } from "@/routes/(protected)/crates/";
import { allowedMemberTypes, allowedSortByValues, isMemberType, isSortByValue } from "@/features/crates/crateSchemas";
import { sortByLabels } from "@/features/crates/utils/crateConstants";

type RouteSearch = ReturnType<typeof Route.useSearch>;
type NavigateFunction = ReturnType<typeof Route.useNavigate>;

export interface CrateFilterState {
  searchTerm: string;
  sortBy: string;
  ascending: boolean;
  page: number;
  pageSize: number;
  memberType: string;
}

type UpdateFilterFn = (partial: Partial<RouteSearch>) => void;

export interface UseCrateFiltersReturn {
  filters: CrateFilterState;
  memberTypeOptions: Array<{ value: string; label: string }>;
  sortByOptions: Array<{ value: string; label: string }>;
  handleSearchChange: (value: string) => void;
  handleMemberTypeChange: (value: string) => void;
  handleSortByChange: (value: string) => void;
  handleSortOrderChange: (ascending: boolean) => void;
  handleResetFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

export function useCrateFilters(currentFilters: CrateFilterState, navigate: NavigateFunction): UseCrateFiltersReturn {
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
      updateFilter({ searchTerm: value, page: 1 });
    },
    [updateFilter]
  );

  const handleMemberTypeChange = useCallback(
    (value: string) => {
      if (isMemberType(value)) {
        updateFilter({ memberType: value, page: 1 });
      } else {
        console.warn(`Invalid member type received: ${value}`);
      }
    },
    [updateFilter]
  );

  const handleSortByChange = useCallback(
    (value: string) => {
      if (isSortByValue(value)) {
        updateFilter({ sortBy: value, page: 1 });
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
      searchTerm: "",
      memberType: "All",
      sortBy: "Name",
      ascending: false,
      page: 1,
    });
  }, [updateFilter]);

  const memberTypeOptions = useMemo(
    () =>
      allowedMemberTypes.map((type) => ({
        value: type,
        label: type,
      })),
    []
  );

  const sortByOptions = useMemo(
    () =>
      allowedSortByValues.map((val) => ({
        value: val,
        label: sortByLabels[val],
      })),
    []
  );

  const hasActiveFilters = useMemo(() => {
    return (
      currentFilters.searchTerm !== "" ||
      currentFilters.memberType !== "All" ||
      currentFilters.sortBy !== "Name" ||
      currentFilters.ascending !== false
    );
  }, [currentFilters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (currentFilters.searchTerm !== "") count++;
    if (currentFilters.memberType !== "All") count++;
    return count;
  }, [currentFilters]);

  return {
    filters: currentFilters,
    memberTypeOptions,
    sortByOptions,
    handleSearchChange,
    handleMemberTypeChange,
    handleSortByChange,
    handleSortOrderChange,
    handleResetFilters,
    hasActiveFilters,
    activeFilterCount,
  };
}
