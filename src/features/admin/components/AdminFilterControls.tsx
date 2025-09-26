import React from "react";
import { RotateCcw } from "lucide-react";
import { SearchInput } from "@/shared/components/search/SearchInput";
import { FilterSelect } from "@/shared/components/filter/FilterSelect";
import { SortControls } from "@/shared/components/sort/SortControls";
import { Button } from "@/shared/components/ui/button";
import { type UseAdminFiltersReturn } from "@/features/admin/hooks/useAdminFilters";

type AdminFilterControlsProps = {
  filterControls: UseAdminFiltersReturn;
  isMobile?: boolean;
  onMobileClose?: () => void;
};

const AdminFilterControls: React.FC<AdminFilterControlsProps> = ({
  filterControls,
  isMobile = false,
  onMobileClose,
}) => {
  const {
    filters,
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
  } = filterControls;

  const containerClass = isMobile ? "flex flex-col space-y-4" : "flex gap-2";
  const searchClass = isMobile ? "w-full" : "flex-1 min-w-[300px]";

  const handleReset = () => {
    handleResetFilters();
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      <div className={containerClass}>
        <FilterSelect
          label="User Type"
          value={filters.userType}
          onChange={handleUserTypeChange}
          options={userTypeOptions}
        />

        <FilterSelect
          label="Status"
          value={filters.userStatus}
          onChange={handleUserStatusChange}
          options={userStatusOptions}
        />

        <FilterSelect
          label="Plan"
          value={filters.planFilter}
          onChange={handlePlanFilterChange}
          options={planFilterOptions}
        />

        <SortControls
          label="Sort By"
          value={filters.sortBy}
          ascending={filters.ascending}
          options={sortByOptions}
          onValueChange={handleSortByChange}
          onOrderChange={handleSortOrderChange}
        />

        {hasActiveFilters && (
          <Button
            variant={isMobile ? "outline" : "ghost"}
            size={isMobile ? "default" : "sm"}
            onClick={handleReset}
            className={isMobile ? "w-full justify-center" : "shrink-0"}
          >
            <RotateCcw className="h-4 w-4" />
            <span className="ml-2">Reset Filters</span>
          </Button>
        )}
      </div>
    </>
  );
};

export default AdminFilterControls;
