import { Search } from "lucide-react";
import ContentInput from "./ContentInput";
import MobileFilterDialog from "./MobileFilterDialog";
import FilterControls from "./FilterControls";
import type { FilterControl, SortConfig } from "@/shared/types/sharedTypes";
import type { ReactNode } from "react";
import ResponsiveSearch from "../search/ResponsiveSearch";

export type FiltersConfig<T extends string> = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  searchPlaceholder: string;
  sort?: SortConfig<T>;
  controls?: FilterControl[];
  actions?: ReactNode[];
  layout?: {
    searchBreakpoint?: "lg" | "2xl";
    mobileDialog?: boolean;
  };
};

function ContentFilter<T extends string>({
  searchTerm,
  onSearchTermChange,
  searchPlaceholder,
  sort,
  controls = [],
  actions = [],
  layout = { searchBreakpoint: "lg", mobileDialog: false },
}: FiltersConfig<T>) {
  if (layout.mobileDialog) {
    return (
      <div className="space-y-4">
        {/* Mobile: Search + Dialog */}
        <div className="flex gap-2 md:hidden">
          <div className="flex-1">
            <ContentInput
              value={searchTerm}
              onChange={onSearchTermChange}
              placeholder={searchPlaceholder}
              icon={Search}
            />
          </div>
          <MobileFilterDialog controls={controls} sort={sort} />
        </div>

        {/* Tablet: Separate search */}
        <div className="hidden md:block 2xl:hidden">
          <ContentInput value={searchTerm} onChange={onSearchTermChange} placeholder={searchPlaceholder} />
        </div>

        {/* Desktop: Inline layout */}
        <div className="hidden md:flex md:items-end md:justify-between 2xl:flex-row 2xl:gap-4">
          <div className="hidden 2xl:block 2xl:flex-1">
            <ContentInput value={searchTerm} onChange={onSearchTermChange} placeholder={searchPlaceholder} />
          </div>
          <FilterControls controls={controls} sort={sort} layout="inline" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ResponsiveSearch
        searchTerm={searchTerm}
        onSearchTermChange={onSearchTermChange}
        searchPlaceholder={searchPlaceholder}
        searchBreakpoint={layout.searchBreakpoint || "lg"}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <FilterControls controls={controls} sort={sort} layout="inline" />
        {actions.length > 0 && <div className="flex gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export default ContentFilter;
