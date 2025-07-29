// /routes/(protected)/crates.tsx

import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

import CrateTable from "@/features/crates/components/CrateTable";
import { crateTableColumns } from "@/features/crates/components/crateTableColumns";
import { useGetUserCrates } from "@/features/crates/hooks/queries/useGetUserCrates";
import UpdateCrateModal from "@/features/crates/components/UpdateCrateModal";
import SearchInputField from "@/components/SearchInputField";
import { useDeleteCrate } from "@/features/crates/hooks/mutations/useDeleteCrate";
import type { Crate } from "@/features/crates/types/Crate";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// ------------------
// Types & helpers
// ------------------

const allowedSortByValues = ["Name", "JoinedAt", "UsedStorage", "Owned", "Joined"] as const;
type SortByType = (typeof allowedSortByValues)[number];
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
});

export const Route = createFileRoute("/(protected)/crates/")({
  validateSearch: zodValidator(crateSearchSchema),
  component: CratesPage,
});

// ------------------
// Component
// ------------------

function CratesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const sortBy = isSortBy(search.sortBy) ? search.sortBy : undefined;
  const orderBy = isOrderBy(search.orderBy) ? search.orderBy : "Desc";
  const searchTerm = search.searchTerm ?? "";
  const sortDescending = orderBy === "Desc";

  const setSearchParams = (params: Partial<typeof search>) => {
    navigate({
      search: (old) => ({
        ...old,
        ...params,
      }),
    });
  };

  const { data, isLoading } = useGetUserCrates({
    searchTerm,
    sortBy,
    orderBy,
  });
  const [editingCrate, setEditingCrate] = useState<Crate | null>(null);
  const { mutateAsync: deleteCrate } = useDeleteCrate();

  const handleEdit = (crate: Crate) => setEditingCrate(crate);
  const handleClose = () => setEditingCrate(null);

  if (isLoading) return <p>Loading crates...</p>;

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">My Crates</h2>

      <div className="flex flex-wrap items-end gap-4">
        <SearchInputField
          value={searchTerm}
          onChange={(val) => setSearchParams({ searchTerm: val })}
          placeholder="Search crates by name..."
        />

        {/* Sort by */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Sort By</label>
          <Select
            value={sortBy ?? "none"}
            onValueChange={(val) =>
              setSearchParams({
                sortBy: val === "none" ? undefined : (val as SortByType),
              })
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {allowedSortByValues.map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort direction */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Order</label>
          <div className="flex gap-2">
            <Button
              variant={orderBy === "Asc" ? "default" : "outline"}
              onClick={() => setSearchParams({ orderBy: "Asc" })}
            >
              Asc
            </Button>
            <Button
              variant={orderBy === "Desc" ? "default" : "outline"}
              onClick={() => setSearchParams({ orderBy: "Desc" })}
            >
              Desc
            </Button>
          </div>
        </div>
      </div>

      <CrateTable
        data={data ?? []}
        columns={crateTableColumns({
          onEdit: handleEdit,
          onDelete: deleteCrate,
          onLeave: (crate) => console.log("leave", crate.id),
        })}
      />

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
