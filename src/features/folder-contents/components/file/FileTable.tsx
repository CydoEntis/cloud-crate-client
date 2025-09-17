import { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, type ColumnDef, type Row } from "@tanstack/react-table";

import { useMediaQuery } from "usehooks-ts";
import FolderBreadcrumbs from "../folder/FolderBreadcrumbs";
import { Table, TableBody } from "@/shared/components/ui/table";
import GenericTableHeader from "@/shared/components/GenericTableHeader";
import { Skeleton } from "@/shared/components/ui/skeleton";
import GenericTableRow from "@/shared/components/GenericTableRow";
import type { FolderContentRowItem, FolderContents } from "../../types/sharedTypes";
import type { CrateFile } from "../../types/fileTypes";
import type { FolderBreadcrumb } from "../../types/folderTypes";

type FileTableProps = {
  crateId: string;
  data: FolderContents;
  columns: ColumnDef<FolderContentRowItem>[];
  breadcrumbs: FolderBreadcrumb[];
  isLoading?: boolean;
  onNavigate?: (folderId: string | null) => void;
  onDropItem?: (item: { id: string; isFolder: boolean }, targetFolderId: string | null) => void;
  onPreviewFile?: (file: CrateFile) => void;
  onBreadcrumbAction?: (action: string, folderId: string) => void;
};

function FileTable({
  crateId,
  data,
  columns,
  isLoading,
  onNavigate,
  onDropItem,
  onPreviewFile,
  onBreadcrumbAction,
}: FileTableProps) {
  const isMobile = useMediaQuery("(max-width: 719px)");
  const isTablet = useMediaQuery("(min-width: 720px) and (max-width: 1199px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const [columnVisibility, setColumnVisibility] = useState({});

  useEffect(() => {
    if (isMobile) {
      setColumnVisibility({
        name: true,
        uploadedByDisplayName: false,
        createdAt: false,
        sizeInBytes: false,
        controls: true,
      });
    } else if (isTablet) {
      setColumnVisibility({
        name: true,
        uploadedByDisplayName: true,
        createdAt: false,
        sizeInBytes: false,
        controls: true,
      });
    } else if (isDesktop) {
      setColumnVisibility({
        name: true,
        uploadedByDisplayName: true,
        createdAt: true,
        sizeInBytes: true,
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
      <FolderBreadcrumbs crateId={crateId} breadcrumbs={data.breadcrumbs} onAction={onBreadcrumbAction} />

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
