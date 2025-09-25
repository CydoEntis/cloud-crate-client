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
    <div className="space-y-4">
      <div className="lg:hidden">
        <SearchInputField value={searchTerm} onChange={onSearchTermChange} placeholder="Search crates by name..." />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between lg:gap-4">
        <div className="hidden lg:block lg:flex-1">
          <SearchInputField value={searchTerm} onChange={onSearchTermChange} placeholder="Search crates by name..." />
        </div>

        <div className="w-full md:w-auto md:flex-shrink-0">
          <CrateMemberTabs value={memberType} onChange={onMemberTypeChange} />
        </div>

        <div className="w-full flex gap-2 md:w-auto md:flex-shrink-0">
          <div className="flex-1 md:flex-initial">
            <OrderBySelect
              value={sortBy}
              onChange={onSortByChange}
              allowedValues={allowedSortByValues}
              labels={sortByLabels}
            />
          </div>
          <div className="flex-shrink-0">
            <OrderToggle ascending={ascending} onChange={(val) => onOrderChange(val)} />
          </div>
        </div>
      </div>
    </div>
  );
}
