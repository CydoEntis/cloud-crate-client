import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

import CrateTable from "@/features/crates/components/CrateTable";
import { crateTableColumns } from "@/features/crates/components/crateTableColumns";
import { useGetUserCrates } from "@/features/crates/hooks/queries/useGetUserCrates";
import UpdateCrateModal from "@/features/crates/components/UpdateCrateModal";
import SearchInputField from "@/components/SearchInputField";
import SortOrderControls from "@/components/SortOrderControls";
import { useDeleteCrate } from "@/features/crates/hooks/mutations/useDeleteCrate";
import type { Crate } from "@/features/crates/types/Crate";
import PaginationControls from "@/components/PaginationControls";
import { useLeaveCrate } from "@/features/crates/hooks/mutations/useLeaveCrate";

// ------------------
// Types & helpers
// ------------------

const allowedSortByValues = ["Name", "JoinedAt", "UsedStorage"] as const;
type SortByType = (typeof allowedSortByValues)[number];

const sortByLabels: Record<SortByType, string> = {
  Name: "Name",
  JoinedAt: "Joined",
  UsedStorage: "Storage",
};

function isSortBy(value: unknown): value is SortByType {
  return typeof value === "string" && allowedSortByValues.includes(value as SortByType);
}

const allowedOrderByValues = ["Asc", "Desc"] as const;
type OrderByType = (typeof allowedOrderByValues)[number];

function isOrderBy(value: unknown): value is OrderByType {
  return typeof value === "string" && allowedOrderByValues.includes(value as OrderByType);
}

// ------------------
// Search Schema
// ------------------

const crateSearchSchema = z.object({
  searchTerm: z.string().optional(),
  sortBy: z.enum(allowedSortByValues).optional(),
  orderBy: z.enum(allowedOrderByValues).optional(),
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
});

export const Route = createFileRoute("/(protected)/crates/")({
  validateSearch: zodValidator(crateSearchSchema),
  component: CratesPage,
});

function CratesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const sortBy = isSortBy(search.sortBy) ? search.sortBy : "Name";
  const orderBy = isOrderBy(search.orderBy) ? search.orderBy : "Desc";
  const searchTerm = search.searchTerm ?? "";
  const page = search.page ?? 1;
  const pageSize = search.pageSize ?? 10;

  const setSearchParams = (params: Partial<typeof search>) => {
    navigate({
      search: (old) => ({
        ...old,
        ...params,
      }),
    });
  };

  useEffect(() => {
    const missingDefaults: Partial<typeof search> = {};
    if (!search.sortBy) missingDefaults.sortBy = "Name";
    if (!search.orderBy) missingDefaults.orderBy = "Desc";
    if (!search.page) missingDefaults.page = 1;
    if (!search.pageSize) missingDefaults.pageSize = 10;

    if (Object.keys(missingDefaults).length > 0) {
      setSearchParams(missingDefaults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, isPending } = useGetUserCrates({
    searchTerm,
    sortBy,
    orderBy,
    page,
    pageSize,
  });

  const [editingCrate, setEditingCrate] = useState<Crate | null>(null);
  const { mutateAsync: deleteCrate } = useDeleteCrate();
  const { mutateAsync: leaveCrate } = useLeaveCrate();

  const handleEdit = (crate: Crate) => setEditingCrate(crate);
  const handleClose = () => setEditingCrate(null);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">My Crates</h2>

      <div className="flex flex-wrap items-end gap-4 justify-between">
        <SearchInputField
          value={searchTerm}
          onChange={(val) => setSearchParams({ searchTerm: val, page: 1 })}
          placeholder="Search crates by name..."
        />
        <SortOrderControls
          sortBy={sortBy}
          orderBy={orderBy}
          sortByLabels={sortByLabels}
          allowedSortByValues={allowedSortByValues}
          onSortByChange={(val) => setSearchParams({ sortBy: val as SortByType, page: 1 })}
          onOrderByChange={(val) => setSearchParams({ orderBy: val as OrderByType, page: 1 })}
        />
      </div>

      <CrateTable
        data={data?.items ?? []}
        columns={crateTableColumns({
          onEdit: handleEdit,
          onDelete: deleteCrate,
          onLeave: leaveCrate,
        })}
        isLoading={isPending}
      />

      {data && data.items.length > 0 && (
        <PaginationControls
          page={data.page}
          pageSize={data.pageSize}
          totalCount={data.totalCount}
          onPageChange={(newPage: number) => setSearchParams({ page: newPage })}
        />
      )}

      {editingCrate && (
        <UpdateCrateModal
          open
          onOpenChange={(open) => !open && handleClose()}
          crateId={editingCrate.id}
          initialName={editingCrate.name}
          initialColor={editingCrate.color}
        />
      )}
    </div>
  );
}

export default CratesPage;
