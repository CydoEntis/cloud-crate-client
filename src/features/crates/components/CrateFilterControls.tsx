import React, { useState } from "react";
import { RotateCcw, Filter } from "lucide-react";
import { SearchInput } from "@/shared/components/search/SearchInput";
import { FilterSelect } from "@/shared/components/filter/FilterSelect";
import { SortControls } from "@/shared/components/sort/SortControls";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { type UseCrateFiltersReturn } from "@/features/crates/hooks/useCrateFilters";

type CrateFilterControlsProps = {
  filterControls: UseCrateFiltersReturn;
  isMobile?: boolean;
  onMobileClose?: () => void;
};

const CrateFilterControls: React.FC<CrateFilterControlsProps> = ({
  filterControls,
  isMobile = false,
  onMobileClose,
}) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const {
    filters,
    memberTypeOptions,
    sortByOptions,
    handleSearchChange,
    handleMemberTypeChange,
    handleSortByChange,
    handleSortOrderChange,
    handleResetFilters,
    hasActiveFilters,
  } = filterControls;

  const handleReset = () => {
    handleResetFilters();
    if (isMobile && onMobileClose) {
      onMobileClose();
    } else {
      setIsFilterModalOpen(false);
    }
  };

  // Mobile drawer layout (< 768px)
  if (isMobile) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-4">
          <FilterSelect
            label="Membership"
            value={filters.memberType}
            onChange={handleMemberTypeChange}
            options={memberTypeOptions}
            fullWidth={true}
          />

          <SortControls
            label="Sort By"
            value={filters.sortBy}
            ascending={filters.ascending}
            options={sortByOptions}
            onValueChange={handleSortByChange}
            onOrderChange={handleSortOrderChange}
            fullWidth={true}
          />

          {hasActiveFilters && (
            <Button variant="outline" onClick={handleReset} className="w-full justify-center">
              <RotateCcw className="h-4 w-4" />
              <span className="ml-2">Reset Filters</span>
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Desktop layouts (≥ 768px)
  return (
    <div className="w-full space-y-4 2xl:space-y-0 2xl:flex 2xl:items-end 2xl:gap-4">
      <div className="flex justify-between items-end w-full 2xl:flex-1 2xl:min-w-[300px] gap-2">
        <SearchInput
          label="Search Crates"
          value={filters.searchTerm}
          onChange={handleSearchChange}
          placeholder="Search crates by name..."
        />

        {/* Tablet/Small Desktop: Filter button + modal (768px - 1535px) */}
        <div className="flex items-center gap-2 2xl:hidden">
          <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="shrink-0 text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span className="ml-2">Filters</span>
                {hasActiveFilters && (
                  <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    {[filters.memberType, filters.sortBy].filter((f) => f && f !== "All" && f !== "Name").length}
                  </span>
                )}
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md text-muted-foreground border-muted">
              <DialogHeader>
                <DialogTitle>Filter Crates</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <FilterSelect
                  label="Membership"
                  value={filters.memberType}
                  onChange={handleMemberTypeChange}
                  options={memberTypeOptions}
                  fullWidth={true}
                />

                <SortControls
                  label="Sort By"
                  value={filters.sortBy}
                  ascending={filters.ascending}
                  options={sortByOptions}
                  onValueChange={handleSortByChange}
                  onOrderChange={handleSortOrderChange}
                  fullWidth={true}
                />

                {hasActiveFilters && (
                  <Button variant="outline" onClick={handleReset} className="w-full justify-center">
                    <RotateCcw className="h-4 w-4" />
                    <span className="ml-2">Reset Filters</span>
                  </Button>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Large Desktop: Inline filters (≥ 1536px) */}
      <div className="hidden 2xl:flex 2xl:gap-4 2xl:items-end 2xl:shrink-0">
        <FilterSelect
          label="Membership"
          value={filters.memberType}
          onChange={handleMemberTypeChange}
          options={memberTypeOptions}
          fullWidth={false}
        />

        <SortControls
          label="Sort By"
          value={filters.sortBy}
          ascending={filters.ascending}
          options={sortByOptions}
          onValueChange={handleSortByChange}
          onOrderChange={handleSortOrderChange}
          fullWidth={false}
        />
      </div>
    </div>
  );
};

export default CrateFilterControls;
