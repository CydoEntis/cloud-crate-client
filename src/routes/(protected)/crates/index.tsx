import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useMemo, useCallback, useState } from "react";
import CrateTable from "@/features/crates/components/CrateTable";
import { crateSearchSchema } from "@/features/crates/crateSchemas";
import { useGetCrates, useDeleteCrate } from "@/features/crates/api/crateQueries";
import { crateTableColumns } from "@/features/crates/components/crateTableColumns";
import type { Crate, CrateSummary } from "@/features/crates/crateTypes";
import { useCrateFilters } from "@/features/crates/hooks/useCrateFilters";
import CratesPagination from "@/features/crates/components/CratesPagination";
import CratesConfirmActionDialog from "@/features/crates/components/CratesConfirmActionDialog";
import CratesError from "@/features/crates/components/CratesError";
import NoCratesFound from "@/features/crates/components/NoCratesFound";
import CratesPageHeader from "@/features/crates/components/CratesPageHeader";
import CrateFilters from "@/features/crates/components/CrateFilters";
import { useLeaveCrate } from "@/features/members/api/memberQueries";
import { useUserStore } from "@/features/user/userStore";

export const Route = createFileRoute("/(protected)/crates/")({
  validateSearch: zodValidator(crateSearchSchema),
  errorComponent: CratesError,
  component: CratesPage,
});

function CratesPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6 p-4">
      <CratesPageHeader />
      {children}
    </div>
  );
}

type ConfirmAction = {
  type: "delete" | "leave";
  crate: CrateSummary;
} | null;

function CratesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const currentUser = useUserStore((state) => state.user);

  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const currentFilters = useMemo(
    () => ({
      searchTerm: search.searchTerm ?? "",
      sortBy: search.sortBy ?? "Name",
      ascending: search.ascending ?? false,
      page: search.page ?? 1,
      pageSize: search.pageSize ?? 10,
      memberType: search.memberType ?? "All",
    }),
    [search]
  );

  const filterControls = useCrateFilters(currentFilters, navigate);
  const { data: crates, isPending, error } = useGetCrates(currentFilters);

  const { mutateAsync: deleteCrate, isPending: isDeleting } = useDeleteCrate();
  const leaveCrateMutation = useLeaveCrate();

  if (error) {
    throw error;
  }

  const handleEditCrate = useCallback(
    (crate: Crate) => {
      navigate({ search: (old) => ({ ...old, edit: crate.id }) });
    },
    [navigate]
  );

  const handleDeleteCrate = useCallback((crate: CrateSummary) => {
    setConfirmAction({ type: "delete", crate });
  }, []);

  const handleLeaveCrate = useCallback((crate: CrateSummary) => {
    setConfirmAction({ type: "leave", crate });
  }, []);

  const handleConfirmAction = useCallback(async () => {
    if (!confirmAction || !currentUser) return;

    try {
      if (confirmAction.type === "delete") {
        await deleteCrate(confirmAction.crate.id);
      } else {
        await leaveCrateMutation.mutateAsync({
          crateId: confirmAction.crate.id,
          userId: currentUser.id,
        });
      }
      setConfirmAction(null);
    } catch (error) {
      console.error("Action failed:", error);
    }
  }, [confirmAction, deleteCrate, leaveCrateMutation, currentUser]);

  const handleCancelAction = useCallback(() => {
    setConfirmAction(null);
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      navigate({
        search: (old) => ({ ...old, page: newPage }),
      });
    },
    [navigate]
  );

  const crateColumns = useMemo(
    () =>
      crateTableColumns({
        onEdit: handleEditCrate,
        onDelete: handleDeleteCrate,
        onLeave: handleLeaveCrate,
      }),
    [handleEditCrate, handleDeleteCrate, handleLeaveCrate]
  );

  return (
    <CratesPageLayout>
      <CrateFilters filterControls={filterControls} />

      {!crates?.items?.length && !isPending ? (
        <NoCratesFound
          searchTerm={currentFilters.searchTerm}
          onFilterChange={(partial) => {
            navigate({
              search: (old) => ({ ...old, ...partial }),
            });
          }}
        />
      ) : (
        <>
          <CrateTable
            data={crates?.items ?? []}
            columns={crateColumns}
            isLoading={isPending}
            aria-label="Crates table"
          />
          {crates && !isPending && <CratesPagination crates={crates} onPageChange={handlePageChange} />}
        </>
      )}

      <CratesConfirmActionDialog
        confirmAction={confirmAction}
        isDeleting={isDeleting}
        isLeaving={leaveCrateMutation.isPending}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </CratesPageLayout>
  );
}

export default CratesPage;
