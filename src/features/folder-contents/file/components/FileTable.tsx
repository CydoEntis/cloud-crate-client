import { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, type ColumnDef, type Row } from "@tanstack/react-table";
import { useMediaQuery } from "usehooks-ts";
import { Plus, Trash2, Move } from "lucide-react";
import { Table, TableBody } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import GenericTableHeader from "@/shared/components/table/GenericTableHeader";
import { Skeleton } from "@/shared/components/ui/skeleton";
import GenericTableRow from "@/shared/components/table/GenericTableRow";
import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import type { FolderContentRowItem, FolderContents } from "../../sharedTypes";
import type { FolderBreadcrumb } from "../../folder/folderTypes";
import type { CrateFile } from "../fileTypes";
import FolderBreadcrumbs from "../../folder/components/FolderBreadcrumbs";

type FileTableProps = {
  crateId: string;
  data: FolderContents;
  columns: ColumnDef<FolderContentRowItem>[];
  breadcrumbs: FolderBreadcrumb[];
  isLoading?: boolean;
  canManage?: boolean;
  onNavigate?: (folderId: string | null) => void;
  onDropItem?: (item: { id: string; isFolder: boolean }, targetFolderId: string | null) => void;
  onPreviewFile?: (file: CrateFile) => void;
  onBreadcrumbAction?: (action: string, folderId: string) => void;
  onCreateFolder?: () => void;
  onBulkMove?: () => void;
  onBulkDelete?: () => void;
};

function FileTable({
  crateId,
  data,
  columns,
  isLoading,
  canManage,
  onNavigate,
  onDropItem,
  onPreviewFile,
  onBreadcrumbAction,
  onCreateFolder,
  onBulkMove,
  onBulkDelete,
}: FileTableProps) {
  const isMobile = useMediaQuery("(max-width: 719px)");
  const isTablet = useMediaQuery("(min-width: 720px) and (max-width: 1199px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const [columnVisibility, setColumnVisibility] = useState({});

  const { fileIds, folderIds } = useSelectionStore();
  const selectedCount = fileIds.size + folderIds.size;

  useEffect(() => {
    if (isMobile) {
      setColumnVisibility({
        select: true,
        name: true,
        uploadedBy: false,
        createdAt: false,
        size: false,
        controls: true,
      });
    } else if (isTablet) {
      setColumnVisibility({
        select: true,
        name: true,
        uploadedBy: false,
        createdAt: false,
        size: false,
        controls: true,
      });
    } else if (isDesktop) {
      setColumnVisibility({
        select: true,
        name: true,
        uploadedBy: true,
        createdAt: true,
        size: true,
        controls: true,
      });
    }
  }, [isMobile, isTablet, isDesktop]);

  const items = useMemo(() => [...data.folders, ...data.files], [data.folders, data.files]);

  const table = useReactTable({
    data: items,
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    enableColumnResizing: true,
    defaultColumn: { size: 10 },
  });

  console.log("Crate items: ", items);

  const getRowClass = (row: Row<any>) => (row.original.isFolder ? "cursor-pointer hover:bg-muted/30" : "");

  const handleClickRow = (row: Row<any>, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".actions-cell")) return;
    if (!row.original.isFolder) {
      onPreviewFile?.(row.original as CrateFile);
    }
  };

  const handleDoubleClickRow = (row: Row<any>, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".actions-cell")) return;
    if (row.original.isFolder) {
      onNavigate?.(row.original.id);
    }
  };

  const handleDragStartRow = (row: Row<any>, e: React.DragEvent) => {
    const itemType = row.original.isFolder ? "folder" : "file";
    e.dataTransfer.setData("application/json", JSON.stringify({ id: row.original.id, type: itemType }));
  };

  const handleDropOnRow = (targetRow: Row<any>, dragged: { id: string; type: "file" | "folder" }) => {
    if (dragged.id !== targetRow.original.id && targetRow.original.isFolder) {
      onDropItem?.({ id: dragged.id, isFolder: dragged.type === "folder" }, targetRow.original.id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-2">
        <FolderBreadcrumbs crateId={crateId} breadcrumbs={data.breadcrumbs} onAction={onBreadcrumbAction} />

        <div className="flex items-center gap-2 py-2">
          {selectedCount > 0 && (
            <>
              <span className="text-sm text-muted-foreground mr-2">{selectedCount} selected</span>
              <Button variant="outline" size="sm" onClick={onBulkMove} className="flex items-center gap-2">
                <Move className="h-4 w-4" />
                Move
              </Button>
              <Button variant="outline" size="sm" onClick={onBulkDelete} className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </>
          )}

          {canManage && (
            <Button
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/20 hover:text-primary"
              onClick={onCreateFolder}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
          )}
        </div>
      </div>

      <Table>
        <GenericTableHeader table={table} />
        <TableBody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <tr key={i} className="h-10">
                  <td colSpan={columns.length}>
                    <Skeleton className="w-full h-10 mt-2" />
                  </td>
                </tr>
              ))
            : table
                .getRowModel()
                .rows.map((row, index) => (
                  <GenericTableRow
                    key={row.id}
                    row={row}
                    className={getRowClass(row)}
                    onClickRow={handleClickRow}
                    onDoubleClickRow={handleDoubleClickRow}
                    onDragStartRow={handleDragStartRow}
                    onDropOnRow={handleDropOnRow}
                    rowIndex={index}
                  />
                ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default FileTable;
