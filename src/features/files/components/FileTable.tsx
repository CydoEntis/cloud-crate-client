import { useReactTable, getCoreRowModel, type ColumnDef, type Row } from "@tanstack/react-table";
import { Table, TableBody } from "@/components/ui/table";
import GenericTableHeader from "@/components/GenericTableHeader"; // Use generic header instead of FileTableHeader
import type { FolderOrFileItem } from "@/features/folder/types/FolderOrFileItem";
import { FolderItemType, type DragItemType } from "@/features/folder/types/FolderItemType";
import GenericTableRow from "@/components/GenericTableRow";

type FileTableProps = {
  data: FolderOrFileItem[];
  columns: ColumnDef<FolderOrFileItem, any>[];
  onNavigate?: (folderId: string | null) => void;
  onDropItem?: (itemId: string, itemType: DragItemType, targetFolderId: string | null) => void;
};

function FileTable({ data, columns, onNavigate, onDropItem }: FileTableProps) {
  const table = useReactTable<FolderOrFileItem>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const getRowClass = (row: Row<FolderOrFileItem>) => {
    const data = row.original;
    return data.type === FolderItemType.Folder || data.isBackRow ? "cursor-pointer hover:bg-muted/30" : "";
  };

  const handleClickRow = (row: Row<FolderOrFileItem>, e: React.MouseEvent) => {
    const data = row.original;
    if (!(e.target as HTMLElement).closest(".actions-cell")) {
      if (data.isBackRow) {
        onNavigate?.(data.parentOfCurrentFolderId ?? null);
      } else if (data.type === FolderItemType.Folder) {
        onNavigate?.(data.id);
      }
    }
  };

  const handleDragStartRow = (row: Row<FolderOrFileItem>, e: React.DragEvent) => {
    const data = row.original;
    e.dataTransfer.setData("application/json", JSON.stringify({ id: data.id, type: data.type }));
  };

  const handleDropOnRow = (targetRow: Row<FolderOrFileItem>, dragged: { id: string; type: string }) => {
    const targetData = targetRow.original;
    const targetFolderId = targetData.isBackRow ? (targetData.parentOfCurrentFolderId ?? null) : targetData.id;

    if (dragged.id !== targetData.id) {
      onDropItem?.(dragged.id, dragged.type as DragItemType, targetFolderId);
    }
  };

  return (
    <Table>
      <GenericTableHeader table={table} />
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <GenericTableRow<FolderOrFileItem>
            key={row.id}
            row={row}
            className={getRowClass(row)}
            onClickRow={handleClickRow}
            onDragStartRow={handleDragStartRow}
            onDropOnRow={handleDropOnRow}
          />
        ))}
      </TableBody>
    </Table>
  );
}

export default FileTable;
