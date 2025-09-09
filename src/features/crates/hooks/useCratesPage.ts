import { useState, useMemo, useCallback, useEffect } from "react";
import type { Crate } from "../types/Crate";
import { Route as CratesRoute } from "../../../routes/(protected)/crates";
import { useGetCrates } from "../hooks/queries/useGetCrates";
import { useDeleteCrate } from "../hooks/mutations/useDeleteCrate";
import { useLeaveCrate } from "../hooks/mutations/useLeaveCrate";
import { crateTableColumns } from "../components/crateTableColumns";
import { useCrateSelectionStore } from "../store/useCrateSelectionStore";
import type { z } from "zod";
import { crateSearchSchema } from "../schemas/crateSearchSchema";

type SearchParams = Partial<z.infer<typeof crateSearchSchema>>;

export function useCratesPage() {
  const search = CratesRoute.useSearch();
  const navigate = CratesRoute.useNavigate();

  const { searchTerm = "", sortBy = "Name", ascending, page = 1, memberType = "All" } = search;

  const setSearchParams = useCallback(
    (params: SearchParams, resetPage = false) => {
      navigate({
        search: (old: SearchParams) => {
          const newSearch: SearchParams = { ...old, ...params };
          if (resetPage) newSearch.page = 1;

          if ("ascending" in newSearch) {
            newSearch.ascending = !!newSearch.ascending;
          }

          const isDifferent = Object.keys(newSearch).some(
            (key) => old[key as keyof SearchParams] !== newSearch[key as keyof SearchParams]
          );

          return isDifferent ? newSearch : old;
        },
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

  const selectionStore = useCrateSelectionStore();

  useEffect(() => {
    if (!data?.items) return;

    const newIds = new Set(data.items.map((c) => c.id));
    const currentIds = selectionStore.allIds;

    const isDifferent = newIds.size !== currentIds.size || [...newIds].some((id) => !currentIds.has(id));

    if (isDifferent) {
      selectionStore.setAllIds(data.items.map((c) => c.id));
    }
  }, [data?.items]);

  const columns = useMemo(
    () =>
      crateTableColumns({
        crates: data?.items ?? [],
        onEdit: setEditingCrate,
        onDelete: deleteCrate,
        onLeave: leaveCrate,
      }),
    [data?.items, setEditingCrate, deleteCrate, leaveCrate] 
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
