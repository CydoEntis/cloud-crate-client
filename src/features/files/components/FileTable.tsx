import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { Table, TableBody } from "@/components/ui/table";
import FileTableHeader from "./FileTableHeader";
import FileTableRow from "./FileTableRow";
import type { DragItemType, FolderOrFileItem } from "@/features/folder/types";

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

  return (
    <Table>
      <FileTableHeader table={table} />
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <FileTableRow key={row.id} row={row} onNavigate={onNavigate} onDropItem={onDropItem} />
        ))}
      </TableBody>
    </Table>
  );
}

export default FileTable;
