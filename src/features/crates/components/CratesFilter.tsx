import { allowedSortByValues, sortByLabels } from "../utils/crateConstants";
import CrateMemberTabs from "./CrateMemberTabs";
import SearchInputField from "@/shared/components/SearchInputField";
import OrderToggle from "@/shared/components/OrderToggle";
import OrderBySelect from "@/shared/components/OrderBySelect";

export type MemberType = "All" | "Owner" | "Joined";
export type SortBy = "Name" | "JoinedAt" | "UsedStorage";

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
        <OrderBySelect
          value={sortBy}
          onChange={onSortByChange}
          allowedValues={allowedSortByValues}
          labels={sortByLabels}
        />
        <OrderToggle ascending={ascending} onChange={(val) => onOrderChange(val)} />
      </div>
    </div>
  );
}
