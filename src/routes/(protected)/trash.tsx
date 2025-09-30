import { useMemo, useCallback, useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import ConfirmDialog from "@/shared/components/dialogs/ConfirmDialog";
import PaginationControls from "@/shared/components/pagination/PaginationControls";

import { useGetTrashItems, useRestoreItem, usePermanentlyDeleteItem } from "@/features/trash/api/trashQueries";
import { trashColumns } from "@/features/trash/components/trashColumns";
import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import { trashSearchSchema } from "@/features/trash/trashSchemas";
import TrashPageHeader from "@/features/trash/components/TrashPageHeader";
import { useTrashFilters } from "@/features/trash/hooks/useTrashFilters";
import TrashTable from "@/features/trash/components/TrashTable";
import TrashFilters from "@/features/trash/components/TrashFilters";
import type { TrashItem } from "@/features/trash/trashTypes";

export const Route = createFileRoute("/(protected)/trash")({
  validateSearch: zodValidator(trashSearchSchema),
  component: TrashPage,
});

function TrashPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="space-y-6 p-4">
      <TrashPageHeader />
      {children}
    </section>
  );
}

export default function TrashPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const { clearSelection } = useSelectionStore();

  const [itemToRestore, setItemToRestore] = useState<TrashItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<TrashItem | null>(null);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    clearSelection();
  }, [clearSelection]);

  const currentFilters = useMemo(
    () => ({
      searchTerm: (search as any).search ?? "",
      sortBy: (search as any).sortBy ?? "DeletedAt",
      ascending: (search as any).ascending ?? false,
      page: (search as any).page ?? 1,
      pageSize: (search as any).pageSize ?? 20,
    }),
    [search]
  );

  const filterControls = useTrashFilters(currentFilters, navigate);

  const {
    data: trashData,
    isLoading,
    refetch,
  } = useGetTrashItems({
    page: currentFilters.page,
    pageSize: currentFilters.pageSize,
    searchTerm: currentFilters.searchTerm,
    sortBy: currentFilters.sortBy as "Name" | "DeletedAt" | "Size",
    ascending: currentFilters.ascending,
  });

  const restoreMutation = useRestoreItem();
  const deleteMutation = usePermanentlyDeleteItem();

  const handleRestore = useCallback((item: TrashItem) => {
    setItemToRestore(item);
    setShowRestoreConfirm(true);
  }, []);

  const handleDelete = useCallback((item: TrashItem) => {
    setItemToDelete(item);
    setShowDeleteConfirm(true);
  }, []);

  const handleConfirmRestore = useCallback(async () => {
    if (!itemToRestore) return;

    try {
      await restoreMutation.mutateAsync({
        crateId: itemToRestore.crateId,
        itemId: itemToRestore.id,
        isFolder: itemToRestore.type === "Folder",
      });
      toast.success(`${itemToRestore.type} restored successfully`);
      refetch();
      clearSelection();
    } catch (error) {
      console.error("Failed to restore item:", error);
    } finally {
      setShowRestoreConfirm(false);
      setItemToRestore(null);
    }
  }, [itemToRestore, restoreMutation, refetch, clearSelection]);

  const handleConfirmDelete = useCallback(async () => {
    if (!itemToDelete) return;

    try {
      await deleteMutation.mutateAsync({
        crateId: itemToDelete.crateId,
        itemId: itemToDelete.id,
        isFolder: itemToDelete.type === "Folder",
      });
      toast.success(`${itemToDelete.type} permanently deleted`);
      refetch();
      clearSelection();
    } catch (error) {
      console.error("Failed to delete item:", error);
    } finally {
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  }, [itemToDelete, deleteMutation, refetch, clearSelection]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      navigate({
        search: (old: any) => ({ ...old, page: newPage }),
      });
    },
    [navigate]
  );

  const columns = trashColumns(
    trashData?.items ?? [],
    undefined,
    handleRestore,
    handleDelete
  ) as ColumnDef<TrashItem>[];

  return (
    <TrashPageLayout>
      <TrashFilters filterControls={filterControls} />

      <TrashTable
        data={trashData?.items ?? []}
        columns={columns}
        isLoading={isLoading}
        onRestore={handleRestore}
        onDelete={handleDelete}
        onRefetch={refetch}
      />

      {trashData && trashData.totalCount > 0 && (
        <PaginationControls
          page={currentFilters.page}
          pageSize={currentFilters.pageSize}
          totalCount={trashData.totalCount}
          onPageChange={handlePageChange}
        />
      )}

      <ConfirmDialog
        open={showRestoreConfirm}
        onCancel={() => {
          setShowRestoreConfirm(false);
          setItemToRestore(null);
        }}
        onConfirm={handleConfirmRestore}
        title="Restore Item"
        description={`Are you sure you want to restore "${itemToRestore?.name}"?`}
        confirmLabel="Restore"
        isLoading={restoreMutation.isPending}
      />

      <ConfirmDialog
        open={showDeleteConfirm}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Permanently Delete"
        description={`Are you sure you want to permanently delete "${itemToDelete?.name}"? This action cannot be undone.`}
        confirmLabel="Delete Permanently"
        isLoading={deleteMutation.isPending}
      />
    </TrashPageLayout>
  );
}
