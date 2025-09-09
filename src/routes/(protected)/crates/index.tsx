import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import CrateTable from "@/features/crates/components/CrateTable";
import UpdateCrateModal from "@/features/crates/components/UpdateCrateModal";
import PaginationControls from "@/components/PaginationControls";
import { CratesFilters } from "@/features/crates/components/CratesFilter";
import { crateSearchSchema } from "@/features/crates/schemas/crateSearchSchema";
import { useCratesPage } from "@/features/crates/hooks/useCratesPage";

export const Route = createFileRoute("/(protected)/crates/")({
  validateSearch: zodValidator(crateSearchSchema),
  component: CratesPage,
});

function CratesPage() {
  const {
    searchTerm,
    sortBy,
    ascending,
    memberType,
    data,
    isPending,
    editingCrate,
    setEditingCrate,
    columns,
    updateFilter,
    setSearchParams,
  } = useCratesPage();

  return (
    <div className="space-y-6 p-6">
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-foreground">My Crates</h2>
        <p className="text-muted-foreground text-sm">Manage your owned and joined crates.</p>
      </header>

      <CratesFilters
        searchTerm={searchTerm}
        onSearchTermChange={(val) => updateFilter({ searchTerm: val })}
        memberType={memberType}
        onMemberTypeChange={(val) => updateFilter({ memberType: val })}
        sortBy={sortBy}
        onSortByChange={(val) => updateFilter({ sortBy: val })}
        ascending={ascending}
        onOrderChange={(val) => updateFilter({ ascending: val })}
      />

      <CrateTable data={data?.items ?? []} columns={columns} isLoading={isPending} />

      {data && data.totalCount > 1 && (
        <PaginationControls
          page={data.page}
          pageSize={data.pageSize}
          totalCount={data.totalCount}
          onPageChange={(newPage) => setSearchParams({ page: newPage })}
        />
      )}

      {editingCrate && (
        <UpdateCrateModal
          open
          crateId={editingCrate.id}
          initialName={editingCrate.name}
          initialColor={editingCrate.color}
          onOpenChange={(open) => !open && setEditingCrate(null)}
        />
      )}
    </div>
  );
}
