import { useMemo } from "react";
import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { useMediaQuery } from "usehooks-ts";
import { RotateCcw, Trash2 } from "lucide-react";
import { Table, TableBody } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import GenericTableHeader from "@/shared/components/table/GenericTableHeader";
import { Skeleton } from "@/shared/components/ui/skeleton";
import GenericTableRow from "@/shared/components/table/GenericTableRow";
import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import type { TrashItem } from "../trashTypes";
import { useBulkRestoreItems, useBulkDeleteItems } from "../api/trashQueries";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import ConfirmDialog from "@/shared/components/dialogs/ConfirmDialog";

type TrashTableProps = {
  data: TrashItem[];
  columns: ColumnDef<TrashItem>[];
  isLoading?: boolean;
  onRestore?: (item: TrashItem) => void;
  onDelete?: (item: TrashItem) => void;
  onRefetch?: () => void;
};

function TrashTable({ data, columns, isLoading, onRefetch }: TrashTableProps) {
  const isMobile = useMediaQuery("(max-width: 719px)");
  const isTablet = useMediaQuery("(min-width: 720px) and (max-width: 1199px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const [columnVisibility, setColumnVisibility] = useState({});

  const { fileIds, folderIds, getFinalMoveSelection, clearSelection } = useSelectionStore();
  const selectedCount = fileIds.size + folderIds.size;

  const [showBulkRestoreConfirm, setShowBulkRestoreConfirm] = useState(false);
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);

  const bulkRestoreMutation = useBulkRestoreItems();
  const bulkDeleteMutation = useBulkDeleteItems();

  useEffect(() => {
    if (isMobile) {
      setColumnVisibility({
        select: true,
        name: true,
        deletedByUserName: false,
        deletedAt: false,
        size: false,
        controls: true,
      });
    } else if (isTablet) {
      setColumnVisibility({
        select: true,
        name: true,
        deletedByUserName: false,
        deletedAt: true,
        size: false,
        controls: true,
      });
    } else if (isDesktop) {
      setColumnVisibility({
        select: true,
        name: true,
        deletedByUserName: true,
        deletedAt: true,
        size: true,
        controls: true,
      });
    }
  }, [isMobile, isTablet, isDesktop]);

  const table = useReactTable({
    data,
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    enableColumnResizing: true,
    defaultColumn: { size: 10 },
  });

  const handleBulkRestore = () => {
    setShowBulkRestoreConfirm(true);
  };

  const handleBulkDelete = () => {
    setShowBulkDeleteConfirm(true);
  };

  const handleConfirmBulkRestore = async () => {
    const { fileIds, folderIds } = getFinalMoveSelection();
    if (fileIds.length === 0 && folderIds.length === 0) return;

    try {
      const fileIdSet = new Set(fileIds);
      const folderIdSet = new Set(folderIds);

      const items = data
        .filter((item) => (item.type === "Folder" ? folderIdSet.has(item.id) : fileIdSet.has(item.id)))
        .map((item) => ({
          crateId: item.crateId,
          itemId: item.id,
          isFolder: item.type === "Folder",
        }));

      await bulkRestoreMutation.mutateAsync({ items });
      clearSelection();
      onRefetch?.();
    } catch (error) {
      console.error("Failed to restore items:", error);
    } finally {
      setShowBulkRestoreConfirm(false);
    }
  };

  const handleConfirmBulkDelete = async () => {
    const { fileIds, folderIds } = getFinalMoveSelection();
    if (fileIds.length === 0 && folderIds.length === 0) return;

    try {
      const fileIdSet = new Set(fileIds);
      const folderIdSet = new Set(folderIds);

      const items = data
        .filter((item) => (item.type === "Folder" ? folderIdSet.has(item.id) : fileIdSet.has(item.id)))
        .map((item) => ({
          crateId: item.crateId,
          itemId: item.id,
          isFolder: item.type === "Folder",
        }));

      await bulkDeleteMutation.mutateAsync({ items });
      clearSelection();
      onRefetch?.();
    } catch (error) {
      console.error("Failed to delete items:", error);
    } finally {
      setShowBulkDeleteConfirm(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {selectedCount > 0 && (
          <div className="flex items-center justify-end gap-2 py-2">
            <Button variant="outline" size="sm" onClick={handleBulkRestore} className="flex items-center gap-2">
              <RotateCcw className="h-4 w-4" />
              Restore
            </Button>
            <Button variant="outline" size="sm" onClick={handleBulkDelete} className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Delete Permanently
            </Button>
          </div>
        )}

        <Table>
          <GenericTableHeader table={table} />
          <TableBody>
            {isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="h-10">
                  <td colSpan={columns.length}>
                    <Skeleton className="w-full h-10 mt-2" />
                  </td>
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  <p className="text-muted-foreground">No items in trash</p>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row, index) => <GenericTableRow key={row.id} row={row} rowIndex={index} />)
            )}
          </TableBody>
        </Table>
      </div>

      <ConfirmDialog
        open={showBulkRestoreConfirm}
        onCancel={() => setShowBulkRestoreConfirm(false)}
        onConfirm={handleConfirmBulkRestore}
        title="Restore Items"
        description={`Are you sure you want to restore ${selectedCount} item${selectedCount > 1 ? "s" : ""}?`}
        confirmLabel="Restore"
        isLoading={bulkRestoreMutation.isPending}
      />

      <ConfirmDialog
        open={showBulkDeleteConfirm}
        onCancel={() => setShowBulkDeleteConfirm(false)}
        onConfirm={handleConfirmBulkDelete}
        title="Permanently Delete Items"
        description={`Are you sure you want to permanently delete ${selectedCount} item${selectedCount > 1 ? "s" : ""}? This action cannot be undone.`}
        confirmLabel="Delete Permanently"
        isLoading={bulkDeleteMutation.isPending}
      />
    </>
  );
}

export default TrashTable;
