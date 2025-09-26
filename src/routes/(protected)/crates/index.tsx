import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useMemo, useCallback } from "react";
import CrateTable from "@/features/crates/components/CrateTable";
import {
  allowedMemberTypes,
  allowedSortByValues,
  crateSearchSchema,
  isMemberType,
  isSortByValue,
} from "@/features/crates/crateSchemas";
import { useGetCrates } from "@/features/crates/api/crateQueries";
import { crateTableColumns } from "@/features/crates/components/crateTableColumns";
import type { Crate } from "@/features/crates/crateTypes";
import { useCrateActions } from "@/features/crates/hooks/useCrateActions";
import CratesPagination from "@/features/crates/components/CratesPagination";
import CratesConfirmActionDialog from "@/features/crates/components/CratesConfirmActionDialog";
import CratesError from "@/features/crates/components/CratesError";
import NoCratesFound from "@/features/crates/components/NoCratesFound";
import CratesPageHeader from "@/features/crates/components/CratesPageHeader";
import { sortByLabels } from "@/features/crates/utils/crateConstants";
import { SearchInput } from "@/shared/components/search/SearchInput";
import { FilterSelect } from "@/shared/components/filter/FilterSelect";
import { SortControls } from "@/shared/components/sort/SortControls";

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

  const handlePageChange = useCallback(
    (newPage: number) => {
      navigate({
        search: (old) => ({ ...old, page: newPage }),
      });
    },
    [navigate]
  );

  const handleMemberTypeChange = useCallback(
    (value: string) => {
      if (isMemberType(value)) {
        updateFilter({ memberType: value, page: 1 });
      } else {
        console.warn(`Invalid member type received: ${value}`);
      }
    },
    [updateFilter]
  );

  const handleSortByChange = useCallback(
    (value: string) => {
      if (isSortByValue(value)) {
        updateFilter({ sortBy: value, page: 1 });
      } else {
        console.warn(`Invalid sort by value received: ${value}`);
      }
    },
    [updateFilter]
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

  const memberTypeOptions = useMemo(
    () =>
      allowedMemberTypes.map((type) => ({
        value: type,
        label: type,
      })),
    []
  );

  const sortByOptions = useMemo(
    () =>
      allowedSortByValues.map((val) => ({
        value: val,
        label: sortByLabels[val],
      })),
    []
  );

  return (
    <CratesPageLayout>
      <div className="flex justify-between space-y-4">
        <SearchInput
          label="Search Crates"
          value={crateRequest.searchTerm}
          onChange={(val) => updateFilter({ searchTerm: val, page: 1 })}
          placeholder="Search crates by name..."
        />

        <div className="flex gap-2">
          <FilterSelect
            label="Membership"
            value={crateRequest.memberType}
            onChange={handleMemberTypeChange}
            options={memberTypeOptions}
          />

          <SortControls
            label="Sort By"
            value={crateRequest.sortBy}
            ascending={crateRequest.ascending}
            options={sortByOptions}
            onValueChange={handleSortByChange}
            onOrderChange={(asc) => updateFilter({ ascending: asc, page: 1 })}
          />
        </div>
      </div>

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
