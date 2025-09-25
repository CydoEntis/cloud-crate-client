// routes/(protected)/admin.tsx
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useMemo, useCallback } from "react";
import { useUserStore } from "@/features/user/userStore";
import { adminUserSearchSchema } from "@/features/admin/adminSchemas";
import { useGetAdminUsers } from "@/features/admin/api/adminQueries";
import { adminUserTableColumns } from "@/features/admin/components/adminUserTableColumns";
import { useAdminUserActions } from "@/features/admin/hooks/useAdminUserActions";
import AdminUserTable from "@/features/admin/components/AdminUserTable";
import {
  type UserType,
  type AdminUserSortBy,
  type UserStatus,
  type PlanFilter,
  adminUserSortByValues,
  adminUserSortByLabels,
} from "@/features/admin/utils/adminUserConstants";
import AdminUsersError from "@/features/admin/components/AdminUserError";
import AdminUsersPageHeader from "@/features/admin/components/AdminUsersPageHeader";
import NoUsersFound from "@/features/admin/components/NoUsersFound";
import AdminUserConfirmActionDialog from "@/features/admin/components/AdminUserConfirmActionDialog";
import ContentFilter from "@/shared/components/filter/ContentFilter";
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
      sortBy: (search.sortBy ?? "createdAt") as AdminUserSortBy,
      ascending: search.ascending ?? false,
      page: search.page ?? 1,
      pageSize: search.pageSize ?? 10,
      userType: (search.userType ?? "All") as UserType,
      userStatus: (search.userStatus ?? "All") as UserStatus,
      planFilter: (search.planFilter ?? "All") as PlanFilter,
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
    [users?.items, handleBanUser, handleUnbanUser, handleMakeAdmin, handleRemoveAdmin]
  );

  return (
    <AdminPageLayout>
      <ContentFilter
        searchTerm={usersRequest.searchTerm}
        onSearchTermChange={(val) => updateFilter({ searchTerm: val, page: 1 })}
        searchPlaceholder="Search users by name or email..."
        sort={{
          value: usersRequest.sortBy,
          onChange: (val) => updateFilter({ sortBy: val, page: 1 }),
          allowedValues: adminUserSortByValues,
          labels: adminUserSortByLabels,
          ascending: usersRequest.ascending,
          onOrderChange: (val) => updateFilter({ ascending: val, page: 1 }),
        }}
        controls={[
          {
            type: "select",
            key: "userType",
            label: "User Type",
            value: usersRequest.userType,
            onChange: (val) => updateFilter({ userType: val, page: 1 }),
            options: [
              { value: "All", label: "All Users" },
              { value: "Admin", label: "Admins" },
              { value: "User", label: "Users" },
            ],
          },
          {
            type: "select",
            key: "status",
            label: "Status",
            value: usersRequest.userStatus,
            onChange: (val) => updateFilter({ userStatus: val, page: 1 }),
            options: [
              { value: "All", label: "All Statuses" },
              { value: "Active", label: "Active" },
              { value: "Banned", label: "Banned" },
            ],
          },
          {
            type: "select",
            key: "plan",
            label: "Plan",
            value: usersRequest.planFilter,
            onChange: (val) => updateFilter({ planFilter: val, page: 1 }),
            options: [
              { value: "All", label: "All Plans" },
              { value: "Free", label: "Free" },
              { value: "Premium", label: "Premium" },
              { value: "Max", label: "Max" },
            ],
          },
        ]}
        layout={{ searchBreakpoint: "2xl", mobileDialog: true }}
      />

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
