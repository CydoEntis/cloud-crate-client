import { useState, useMemo, useCallback } from "react";
import type { Crate } from "@/features/crates/types/Crate";
import { Route as CratesRoute } from "../../../routes/(protected)/crates";
import { useGetCrates } from "@/features/crates/hooks/queries/useGetCrates";
import { useDeleteCrate } from "@/features/crates/hooks/mutations/useDeleteCrate";
import { useLeaveCrate } from "@/features/crates/hooks/mutations/useLeaveCrate";
import { crateTableColumns } from "@/features/crates/components/crateTableColumns";
import { crateSearchSchema } from "@/features/crates/schemas/crateSearchSchema";
import type { z } from "zod";

type SearchParams = Partial<z.infer<typeof crateSearchSchema>>;

export function useCratesPage() {
  const search = CratesRoute.useSearch();
  const navigate = CratesRoute.useNavigate();

  const { searchTerm = "", sortBy = "Name", ascending = false, page = 1,  memberType = "All" } = search;

  const setSearchParams = useCallback(
    (params: SearchParams, resetPage = false) => {
      navigate({
        search: (old: SearchParams) => ({
          ...old,
          ...(resetPage ? { page: 1 } : {}),
          ...params,
        }),
      });
    },
    [navigate]
  );

  const updateFilter = useCallback((params: Partial<SearchParams>) => setSearchParams(params, true), [setSearchParams]);

  const { data, isPending } = useGetCrates({
    searchTerm,
    sortBy,
    ascending,
    page,
    memberType,
  });

  const [editingCrate, setEditingCrate] = useState<Crate | null>(null);

  const { mutateAsync: deleteCrate } = useDeleteCrate();
  const { mutateAsync: leaveCrate } = useLeaveCrate();

  const columns = useMemo(
    () => crateTableColumns({ onEdit: setEditingCrate, onDelete: deleteCrate, onLeave: leaveCrate }),
    [deleteCrate, leaveCrate, setEditingCrate]
  );

  return {
    searchTerm,
    sortBy,
    ascending,
    page,
    memberType,
    data,
    isPending,
    editingCrate,
    setEditingCrate,
    columns,
    setSearchParams,
    updateFilter,
  };
}
