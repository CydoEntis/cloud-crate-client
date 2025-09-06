import { useState, useEffect, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";

import CrateTable from "@/features/crates/components/CrateTable";
import { crateTableColumns } from "@/features/crates/components/crateTableColumns";
import { useGetUserCrates } from "@/features/crates/hooks/queries/useGetUserCrates";
import UpdateCrateModal from "@/features/crates/components/UpdateCrateModal";
import SearchInputField from "@/components/SearchInputField";
import OrderToggle from "@/components/OrderToggle";
import PaginationControls from "@/components/PaginationControls";
import { useDeleteCrate } from "@/features/crates/hooks/mutations/useDeleteCrate";
import { useLeaveCrate } from "@/features/crates/hooks/mutations/useLeaveCrate";
import CrateMemberTabs from "@/features/crates/components/CrateMemberTabs";
import SortBySelect from "@/components/OrderBySelect";

import type { Crate } from "@/features/crates/types/Crate";

const allowedSortByValues = ["Name", "JoinedAt", "UsedStorage"] as const;
type SortByType = (typeof allowedSortByValues)[number];

const allowedMemberTypes = ["All", "Owner", "Joined"] as const;
type MemberType = (typeof allowedMemberTypes)[number];

const sortByLabels: Record<SortByType, string> = {
  Name: "Crate Name",
  JoinedAt: "Join Date",
  UsedStorage: "Used Storage",
};

const crateSearchSchema = z.object({
  searchTerm: z.string().optional(),
  sortBy: z.enum(allowedSortByValues).optional(),
  ascending: z.boolean().optional().default(false),
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
  memberType: z.enum(allowedMemberTypes).optional().default("All"),
});

export const Route = createFileRoute("/(protected)/crates/")({
  validateSearch: zodValidator(crateSearchSchema),
  component: CratesPage,
});

function CratesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const sortBy = (search.sortBy ?? "Name") as SortByType;
  const ascending = search.ascending ?? false;
  const searchTerm = search.searchTerm ?? "";
  const page = search.page ?? 1;
  const pageSize = search.pageSize ?? 10;
  const memberType = (search.memberType ?? "All") as MemberType;

  const setSearchParams = (params: Partial<typeof search>) => {
    navigate({ search: (old) => ({ ...old, ...params }) });
  };

  useEffect(() => {
    const missingDefaults: Partial<typeof search> = {};
    if (!("sortBy" in search)) missingDefaults.sortBy = "Name";
    if (!("ascending" in search)) missingDefaults.ascending = false;
    if (!("page" in search)) missingDefaults.page = 1;
    if (!("pageSize" in search)) missingDefaults.pageSize = 10;
    if (!("memberType" in search)) missingDefaults.memberType = "All";

    if (Object.keys(missingDefaults).length > 0) {
      setSearchParams(missingDefaults);
    }
  }, []);

  const { data, isPending } = useGetUserCrates({
    searchTerm,
    sortBy,
    ascending,
    page,
    pageSize,
    memberType,
  });

  const [editingCrate, setEditingCrate] = useState<Crate | null>(null);
  const { mutateAsync: deleteCrate } = useDeleteCrate();
  const { mutateAsync: leaveCrate } = useLeaveCrate();

  const columns = useMemo(
    () => crateTableColumns({ onEdit: setEditingCrate, onDelete: deleteCrate, onLeave: leaveCrate }),
    [deleteCrate, leaveCrate]
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-foreground">My Crates</h2>
        <p className="text-muted-foreground text-sm">Manage your owned and joined crates.</p>
      </div>

      <SearchInputField
        value={searchTerm}
        onChange={(val) => setSearchParams({ searchTerm: val, page: 1 })}
        placeholder="Search crates by name..."
      />

      <div className="flex flex-wrap items-end justify-between gap-4">
        <CrateMemberTabs value={memberType} onChange={(type) => setSearchParams({ memberType: type, page: 1 })} />
        <div className="flex gap-2">
          <SortBySelect
            value={sortBy}
            onChange={(val) => setSearchParams({ sortBy: val, page: 1 })}
            allowedValues={allowedSortByValues}
            labels={sortByLabels}
          />
          <OrderToggle ascending={ascending} onChange={(val) => setSearchParams({ ascending: val, page: 1 })} />
        </div>
      </div>

      <CrateTable data={data?.items ?? []} columns={columns} isLoading={isPending} />

      {data && data.items.length > 0 && (
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

export default CratesPage;
