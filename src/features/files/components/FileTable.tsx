import { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, type ColumnDef, type Row } from "@tanstack/react-table";
import { Table, TableBody } from "@/components/ui/table";
import GenericTableHeader from "@/components/GenericTableHeader";
import type { FolderOrFileItem } from "@/features/folder/types/FolderOrFileItem";
import { FolderItemType, type DragItemType } from "@/features/folder/types/FolderItemType";
import GenericTableRow from "@/components/GenericTableRow";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "usehooks-ts"; // 👈 same as CrateTable

type FileTableProps = {
  data: FolderOrFileItem[];
  columns: ColumnDef<FolderOrFileItem, any>[];
  onNavigate?: (folderId: string | null) => void;
  onDropItem?: (itemId: string, itemType: DragItemType, targetFolderId: string | null) => void;
  isLoading?: boolean;
  onPreviewFile?: (file: FolderOrFileItem) => void;
};

function FileTable({ data, columns, onNavigate, onDropItem, isLoading, onPreviewFile }: FileTableProps) {
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

  const table = useReactTable<FolderOrFileItem>({
    data,
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    enableColumnResizing: true,
    defaultColumn: {
      size: 10,
    },
  });

  const getRowClass = (row: Row<FolderOrFileItem>) => {
    const data = row.original;
    return data.type === FolderItemType.Folder || data.isBackRow
      ? "cursor-pointer hover:bg-muted/30"
      : "";
  };

  const handleClickRow = (row: Row<FolderOrFileItem>, e: React.MouseEvent) => {
    const data = row.original;
    if ((e.target as HTMLElement).closest(".actions-cell")) return;

    if (data.type === FolderItemType.File && !data.isBackRow) {
      onPreviewFile?.(data);
    }
  };

  const handleDoubleClickRow = (row: Row<FolderOrFileItem>, e: React.MouseEvent) => {
    const data = row.original;
    if ((e.target as HTMLElement).closest(".actions-cell")) return;

    if (data.isBackRow) {
      onNavigate?.(data.parentOfCurrentFolderId ?? null);
    } else if (data.type === FolderItemType.Folder) {
      onNavigate?.(data.id);
    }
  };

  const handleDragStartRow = (row: Row<FolderOrFileItem>, e: React.DragEvent) => {
    const data = row.original;
    e.dataTransfer.setData("application/json", JSON.stringify({ id: data.id, type: data.type }));
  };

  const handleDropOnRow = (targetRow: Row<FolderOrFileItem>, dragged: { id: string; type: string }) => {
    const targetData = targetRow.original;
    const targetFolderId = targetData.isBackRow
      ? targetData.parentOfCurrentFolderId ?? null
      : targetData.id;

    if (dragged.id !== targetData.id) {
      onDropItem?.(dragged.id, dragged.type as DragItemType, targetFolderId);
    }
  };

  return (
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
          : table.getRowModel().rows.map((row, index) => (
              <GenericTableRow<FolderOrFileItem>
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
  );
}

export default FileTable;
