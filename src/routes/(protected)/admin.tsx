import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useMemo, useCallback } from "react";
import { useUserStore } from "@/features/user/userStore";
import {
  adminUserSearchSchema,
  adminUserSortByValues,
  userTypeValues,
  userStatusValues,
  planFilterValues,
  isAdminUserSortBy,
  isUserType,
  isUserStatus,
  isPlanFilter,
} from "@/features/admin/adminSchemas";
import { useGetAdminUsers } from "@/features/admin/api/adminQueries";
import { adminUserTableColumns } from "@/features/admin/components/adminUserTableColumns";
import { useAdminUserActions } from "@/features/admin/hooks/useAdminUserActions";
import AdminUserTable from "@/features/admin/components/AdminUserTable";
import { adminUserSortByLabels } from "@/features/admin/utils/adminUserConstants";
import AdminUsersError from "@/features/admin/components/AdminUserError";
import AdminUsersPageHeader from "@/features/admin/components/AdminUsersPageHeader";
import NoUsersFound from "@/features/admin/components/NoUsersFound";
import AdminUserConfirmActionDialog from "@/features/admin/components/AdminUserConfirmActionDialog";
import { SearchInput } from "@/shared/components/search/SearchInput";
import { FilterSelect } from "@/shared/components/filter/FilterSelect";
import { SortControls } from "@/shared/components/sort/SortControls";
import PaginationControls from "@/shared/components/pagination/PaginationControls";

export const Route = createFileRoute("/(protected)/admin")({
  validateSearch: zodValidator(adminUserSearchSchema),
  errorComponent: AdminUsersError,
  beforeLoad: ({ context }) => {
    const { userData } = context;
    if (!userData?.isAdmin) {
      throw new Error("Admin access required");
    }
  },
  component: AdminPage,
});

function AdminPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6 p-6">
      <AdminUsersPageHeader />
      {children}
    </div>
  );
}

function AdminPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const usersRequest = useMemo(
    () => ({
      searchTerm: search.searchTerm ?? "",
      sortBy: search.sortBy ?? "createdAt",
      ascending: search.ascending ?? false,
      page: search.page ?? 1,
      pageSize: search.pageSize ?? 10,
      userType: search.userType ?? "All",
      userStatus: search.userStatus ?? "All",
      planFilter: search.planFilter ?? "All",
    }),
    [search]
  );

  const { data: users, isPending, error } = useGetAdminUsers(usersRequest);

  if (error) {
    throw error;
  }

  const {
    confirmAction,
    handleBanUser,
    handleUnbanUser,
    handleMakeAdmin,
    handleRemoveAdmin,
    handleConfirmAction,
    handleCancelAction,
    handleUpdatePlan,
    isBanning,
    isUnbanning,
    isMakingAdmin,
    isRemovingAdmin,
  } = useAdminUserActions(users?.items ?? []);

  const updateFilter = useCallback(
    (partial: Partial<typeof usersRequest>) => {
      navigate({
        search: (old) => ({ ...old, ...partial }),
      });
    },
    [navigate]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      navigate({
        search: (old) => ({ ...old, page: newPage }),
      });
    },
    [navigate]
  );

  // Type-safe filter handlers
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

  const userColumns = useMemo(
    () =>
      adminUserTableColumns({
        users: users?.items ?? [],
        onBan: handleBanUser,
        onUnban: handleUnbanUser,
        onMakeAdmin: handleMakeAdmin,
        onRemoveAdmin: handleRemoveAdmin,
        onUpdatePlan: handleUpdatePlan,
      }),
    [users?.items, handleBanUser, handleUnbanUser, handleMakeAdmin, handleRemoveAdmin, handleUpdatePlan]
  );

  // Memoized filter options
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
      { value: "Premium", label: "Premium" },
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

  return (
    <AdminPageLayout>
      <div className="flex justify-between space-y-4">
        <SearchInput
          label="Search Users"
          value={usersRequest.searchTerm}
          onChange={(val) => updateFilter({ searchTerm: val, page: 1 })}
          placeholder="Search users by name or email..."
        />

        <div className="flex gap-2">
          <FilterSelect
            label="User Type"
            value={usersRequest.userType}
            onChange={handleUserTypeChange}
            options={userTypeOptions}
          />

          <FilterSelect
            label="Status"
            value={usersRequest.userStatus}
            onChange={handleUserStatusChange}
            options={userStatusOptions}
          />

          <FilterSelect
            label="Plan"
            value={usersRequest.planFilter}
            onChange={handlePlanFilterChange}
            options={planFilterOptions}
          />

          <SortControls
            label="Sort By"
            value={usersRequest.sortBy}
            ascending={usersRequest.ascending}
            options={sortByOptions}
            onValueChange={handleSortByChange}
            onOrderChange={(asc) => updateFilter({ ascending: asc, page: 1 })}
          />
        </div>
      </div>

      {!users?.items?.length && !isPending ? (
        <NoUsersFound searchTerm={usersRequest.searchTerm} onFilterChange={updateFilter} />
      ) : (
        <>
          <AdminUserTable data={users?.items ?? []} columns={userColumns} isLoading={isPending} />
          {users && !isPending && (
            <PaginationControls
              page={usersRequest.page}
              pageSize={usersRequest.pageSize}
              totalCount={users.totalCount}
              onPageChange={handlePageChange}
              align="center"
            />
          )}
        </>
      )}

      <AdminUserConfirmActionDialog
        confirmAction={confirmAction}
        isBanning={isBanning}
        isUnbanning={isUnbanning}
        isMakingAdmin={isMakingAdmin}
        isRemovingAdmin={isRemovingAdmin}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </AdminPageLayout>
  );
}
