import { useMemo, useCallback } from "react";
import { Route } from "@/routes/(protected)/admin";
import {
  adminUserSortByValues,
  isAdminUserSortBy,
  isUserType,
  isUserStatus,
  isPlanFilter,
} from "@/features/admin/adminSchemas";
import { adminUserSortByLabels } from "@/features/admin/utils/adminUserConstants";

type RouteSearch = ReturnType<typeof Route.useSearch>;
type NavigateFunction = ReturnType<typeof Route.useNavigate>;

export interface AdminFilterState {
  searchTerm: string;
  sortBy: string;
  ascending: boolean;
  page: number;
  pageSize: number;
  userType: string;
  userStatus: string;
  planFilter: string;
}

type UpdateFilterFn = (partial: Partial<RouteSearch>) => void;

export interface UseAdminFiltersReturn {
  filters: AdminFilterState;
  userTypeOptions: Array<{ value: string; label: string }>;
  userStatusOptions: Array<{ value: string; label: string }>;
  planFilterOptions: Array<{ value: string; label: string }>;
  sortByOptions: Array<{ value: string; label: string }>;
  handleSearchChange: (value: string) => void;
  handleUserTypeChange: (value: string) => void;
  handleUserStatusChange: (value: string) => void;
  handlePlanFilterChange: (value: string) => void;
  handleSortByChange: (value: string) => void;
  handleSortOrderChange: (ascending: boolean) => void;
  handleResetFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

export function useAdminFilters(currentFilters: AdminFilterState, navigate: NavigateFunction): UseAdminFiltersReturn {
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

  const handleUserTypeChange = useCallback(
    (value: string) => {
      if (isUserType(value)) {
        updateFilter({ userType: value, page: 1 });
      } else {
        console.warn(`Invalid user type received: ${value}`);
      }
    },
    [updateFilter]
  );

  const handleUserStatusChange = useCallback(
    (value: string) => {
      if (isUserStatus(value)) {
        updateFilter({ userStatus: value, page: 1 });
      } else {
        console.warn(`Invalid user status received: ${value}`);
      }
    },
    [updateFilter]
  );

  const handlePlanFilterChange = useCallback(
    (value: string) => {
      if (isPlanFilter(value)) {
        updateFilter({ planFilter: value, page: 1 });
      } else {
        console.warn(`Invalid plan filter received: ${value}`);
      }
    },
    [updateFilter]
  );

  const handleSortByChange = useCallback(
    (value: string) => {
      if (isAdminUserSortBy(value)) {
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
      userType: "All",
      userStatus: "All",
      planFilter: "All",
      sortBy: "CreatedAt", 
      ascending: false,
      page: 1,
    });
  }, [updateFilter]);

  const userTypeOptions = useMemo(
    () => [
      { value: "All", label: "All Users" },
      { value: "Admin", label: "Admins" },
      { value: "User", label: "Users" },
    ],
    []
  );

  const userStatusOptions = useMemo(
    () => [
      { value: "All", label: "All Statuses" },
      { value: "Active", label: "Active" },
      { value: "Banned", label: "Banned" },
    ],
    []
  );

  const planFilterOptions = useMemo(
    () => [
      { value: "All", label: "All Plans" },
      { value: "Free", label: "Free" },
      { value: "Mini", label: "Mini" },
      { value: "Standard", label: "Standard" },
      { value: "Max", label: "Max" },
    ],
    []
  );

  const sortByOptions = useMemo(
    () =>
      adminUserSortByValues.map((val) => ({
        value: val,
        label: adminUserSortByLabels[val],
      })),
    []
  );

  const hasActiveFilters = useMemo(() => {
    return (
      currentFilters.searchTerm !== "" ||
      currentFilters.userType !== "All" ||
      currentFilters.userStatus !== "All" ||
      currentFilters.planFilter !== "All" ||
      currentFilters.sortBy !== "CreatedAt" || 
      currentFilters.ascending !== false
    );
  }, [currentFilters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (currentFilters.searchTerm !== "") count++;
    if (currentFilters.userType !== "All") count++;
    if (currentFilters.userStatus !== "All") count++;
    if (currentFilters.planFilter !== "All") count++;
    return count;
  }, [currentFilters]);

  return {
    filters: currentFilters,
    userTypeOptions,
    userStatusOptions,
    planFilterOptions,
    sortByOptions,
    handleSearchChange,
    handleUserTypeChange,
    handleUserStatusChange,
    handlePlanFilterChange,
    handleSortByChange,
    handleSortOrderChange,
    handleResetFilters,
    hasActiveFilters,
    activeFilterCount,
  };
}
