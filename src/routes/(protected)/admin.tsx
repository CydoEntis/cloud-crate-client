import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useMemo } from "react";
import { adminUserSearchSchema } from "@/features/admin/adminSchemas";
import { useGetAdminUsers } from "@/features/admin/api/adminQueries";
import { adminUserTableColumns } from "@/features/admin/components/adminUserTableColumns";
import { useAdminUserActions } from "@/features/admin/hooks/useAdminUserActions";
import { useAdminFilters } from "@/features/admin/hooks/useAdminFilters";
import AdminUserTable from "@/features/admin/components/AdminUserTable";
import AdminUsersError from "@/features/admin/components/AdminUserError";
import AdminUsersPageHeader from "@/features/admin/components/AdminUsersPageHeader";
import NoUsersFound from "@/features/admin/components/NoUsersFound";
import AdminUserConfirmActionDialog from "@/features/admin/components/AdminUserConfirmActionDialog";
import PaginationControls from "@/shared/components/pagination/PaginationControls";
import AdminFilters from "@/features/admin/components/AdminFilters";

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

  const currentFilters = useMemo(
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

  const filterControls = useAdminFilters(currentFilters, navigate);

  const { data: users, isPending, error } = useGetAdminUsers(currentFilters);

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

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (old) => ({ ...old, page: newPage }),
    });
  };

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

  return (
    <AdminPageLayout>
      <AdminFilters filterControls={filterControls} />

      {/* Results */}
      {!users?.items?.length && !isPending ? (
        <NoUsersFound
          searchTerm={currentFilters.searchTerm}
          onFilterChange={(partial) => {
            navigate({
              search: (old) => ({ ...old, ...partial }),
            });
          }}
        />
      ) : (
        <>
          <AdminUserTable data={users?.items ?? []} columns={userColumns} isLoading={isPending} />
          {users && !isPending && (
            <PaginationControls
              page={currentFilters.page}
              pageSize={currentFilters.pageSize}
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
