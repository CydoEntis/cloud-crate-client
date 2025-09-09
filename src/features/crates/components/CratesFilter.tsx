import SearchInputField from "@/components/SearchInputField";
import OrderToggle from "@/components/OrderToggle";

import SortBySelect from "@/components/OrderBySelect";
import { allowedSortByValues, sortByLabels } from "../utils/crate.constants";
import type { SortBy } from "../types/SortBy";
import type { MemberType } from "../types/MemberType";
import CrateMemberTabs from "./CrateMemberTabs";

export function CratesFilters({
  searchTerm,
  onSearchTermChange,
  memberType,
  onMemberTypeChange,
  sortBy,
  onSortByChange,
  ascending,
  onOrderChange,
}: {
  searchTerm: string;
  onSearchTermChange: (val: string) => void;
  memberType: MemberType;
  onMemberTypeChange: (val: MemberType) => void;
  sortBy: SortBy;
  onSortByChange: (val: SortBy) => void;
  ascending: boolean;
  onOrderChange: (val: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <SearchInputField value={searchTerm} onChange={onSearchTermChange} placeholder="Search crates by name..." />
      <div className="flex flex-wrap items-end gap-2">
        <CrateMemberTabs value={memberType} onChange={onMemberTypeChange} />
        <SortBySelect
          value={sortBy}
          onChange={onSortByChange}
          allowedValues={allowedSortByValues}
          labels={sortByLabels}
        />
        <OrderToggle ascending={ascending} onChange={onOrderChange} />
      </div>
    </div>
  );
}
