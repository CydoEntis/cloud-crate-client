import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useMemo, useCallback } from "react";
import CrateTable from "@/features/crates/components/CrateTable";
import { crateSearchSchema } from "@/features/crates/crateSchemas";
import { useGetCrates } from "@/features/crates/api/crateQueries";
import { crateTableColumns } from "@/features/crates/components/crateTableColumns";
import type { Crate } from "@/features/crates/crateTypes";
import { useCrateActions } from "@/features/crates/hooks/useCrateActions";
import { useCrateFilters } from "@/features/crates/hooks/useCrateFilters";
import CratesPagination from "@/features/crates/components/CratesPagination";
import CratesConfirmActionDialog from "@/features/crates/components/CratesConfirmActionDialog";
import CratesError from "@/features/crates/components/CratesError";
import NoCratesFound from "@/features/crates/components/NoCratesFound";
import CratesPageHeader from "@/features/crates/components/CratesPageHeader";
import CrateFilters from "@/features/crates/components/CrateFilters";

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

function CratesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const editingCrateId = search.edit ?? null;

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

  if (error) {
    throw error;
  }

  const {
    confirmAction,
    handleDeleteCrate,
    handleLeaveCrate,
    handleConfirmAction,
    handleCancelAction,
    isDeleting,
    isLeaving,
  } = useCrateActions(crates?.items ?? []);

  const handleEditCrate = useCallback(
    (crate: Crate) => {
      navigate({ search: (old) => ({ ...old, edit: crate.id }) });
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

  const crateColumns = useMemo(
    () =>
      crateTableColumns({
        crates: crates?.items ?? [],
        onEdit: handleEditCrate,
        onDelete: handleDeleteCrate,
        onLeave: handleLeaveCrate,
      }),
    [crates?.items, handleEditCrate, handleDeleteCrate, handleLeaveCrate]
  );

  return (
    <CratesPageLayout>
      <CrateFilters filterControls={filterControls} />

      {/* Results */}
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
        isLeaving={isLeaving}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </CratesPageLayout>
  );
}
