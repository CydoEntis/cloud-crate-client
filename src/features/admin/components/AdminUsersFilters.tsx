import { adminUserSortByValues, adminUserSortByLabels } from "../utils/adminUserConstants";
import AdminUserTypeTabs from "./AdminUserTypeTabs";
import SearchInputField from "@/shared/components/SearchInputField";
import OrderToggle from "@/shared/components/OrderToggle";
import OrderBySelect from "@/shared/components/OrderBySelect";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Label } from "@/shared/components/ui/label";

import type { UserType, AdminUserSortBy, UserStatus, PlanFilter } from "../utils/adminUserConstants";

function AdminUsersFilters({
  searchTerm,
  onSearchTermChange,
  userType,
  onUserTypeChange,
  sortBy,
  onSortByChange,
  ascending,
  onOrderChange,
  userStatus,
  onUserStatusChange,
  planFilter,
  onPlanFilterChange,
}: {
  searchTerm: string;
  onSearchTermChange: (val: string) => void;
  userType: UserType;
  onUserTypeChange: (val: UserType) => void;
  sortBy: AdminUserSortBy;
  onSortByChange: (val: AdminUserSortBy) => void;
  ascending: boolean;
  onOrderChange: (val: boolean) => void;
  userStatus: UserStatus;
  onUserStatusChange: (val: UserStatus) => void;
  planFilter: PlanFilter;
  onPlanFilterChange: (val: PlanFilter) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ">
        <SearchInputField
          value={searchTerm}
          onChange={onSearchTermChange}
          placeholder="Search users by name or email..."
        />
        <div className="flex gap-2 items-center">
          <Select value={userStatus} onValueChange={onUserStatusChange}>
            <SelectTrigger className="border-input hover:text-accent-foreground hover:bg-accent text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-input">
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Banned">Banned</SelectItem>
            </SelectContent>
          </Select>
          <Select value={planFilter} onValueChange={onPlanFilterChange}>
            <SelectTrigger className="border-input hover:text-accent-foreground hover:bg-accent text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-input">
              <SelectItem value="All">All Plans</SelectItem>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
              <SelectItem value="Max">Max</SelectItem>
            </SelectContent>
          </Select>
          <OrderBySelect
            value={sortBy}
            onChange={onSortByChange}
            allowedValues={adminUserSortByValues}
            labels={adminUserSortByLabels}
          />
          <OrderToggle ascending={ascending} onChange={onOrderChange} />
        </div>
      </div>

      <div className="flex  gap-4 ">
        <AdminUserTypeTabs value={userType} onChange={onUserTypeChange} />
      </div>
    </div>
  );
}

export default AdminUsersFilters;
