import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useMemo, useCallback } from "react";
import CrateTable from "@/features/crates/components/CrateTable";
import { crateSearchSchema } from "@/features/crates/crateSchemas";
import { useGetCrates } from "@/features/crates/api/crateQueries";
import { crateTableColumns } from "@/features/crates/components/crateTableColumns";
import type { Crate } from "@/features/crates/crateTypes";
import { useCrateActions } from "@/features/crates/hooks/useCrateActions";
import CratesPagination from "@/features/crates/components/CratesPagination";
import CratesConfirmActionDialog from "@/features/crates/components/CratesConfirmActionDialog";
import { CratesFilters } from "@/features/crates/components/CratesFilter";
import CratesError from "@/features/crates/components/CratesError";
import NoCratesFound from "@/features/crates/components/NoCratesFound";
import CratesPageHeader from "@/features/crates/components/CratesPageHeader";

export const Route = createFileRoute("/(protected)/crates/")({
  validateSearch: zodValidator(crateSearchSchema),
  errorComponent: CratesError,
  component: CratesPage,
});

function CratesPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6 p-6">
      <CratesPageHeader />
      {children}
    </div>
  );
}

function CratesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const editingCrateId = search.edit ?? null;

  const crateRequest = useMemo(
    () => ({
      searchTerm: search.searchTerm ?? "",
      sortBy: search.sortBy ?? "Name",
      ascending: search.ascending ?? false,
      page: search.page ?? 1,
      pageSize: search.pageSize ?? 10,
      memberType: search.memberType ?? "All",
    }),
    [search.searchTerm, search.sortBy, search.ascending, search.page, search.pageSize, search.memberType]
  );

  const { data: crates, isPending, error } = useGetCrates(crateRequest);


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

  const updateFilter = useCallback(
    (partial: Partial<typeof crateRequest>) => {
      navigate({
        search: (old) => ({ ...old, ...partial }),
      });
    },
    [navigate]
  );

  const handleEditCrate = useCallback(
    (crate: Crate) => {
      navigate({ search: (old) => ({ ...old, edit: crate.id }) });
    },
    [navigate]
  );

  const handleCloseModal = useCallback(() => {
    navigate({
      search: (old) => {
        const { edit, ...rest } = old;
        return rest;
      },
    });
  }, [navigate]);

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
      <CratesFilters
        searchTerm={crateRequest.searchTerm}
        onSearchTermChange={(val) => updateFilter({ searchTerm: val, page: 1 })}
        memberType={crateRequest.memberType}
        onMemberTypeChange={(val) => updateFilter({ memberType: val, page: 1 })}
        sortBy={crateRequest.sortBy}
        onSortByChange={(val) => updateFilter({ sortBy: val, page: 1 })}
        ascending={crateRequest.ascending}
        onOrderChange={(val) => updateFilter({ ascending: val, page: 1 })}
      />

      {!crates?.items?.length && !isPending ? (
        <NoCratesFound searchTerm={crateRequest.searchTerm} onFilterChange={updateFilter} />
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
