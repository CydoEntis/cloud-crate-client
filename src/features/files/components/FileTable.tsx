import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { Table, TableBody } from "@/components/ui/table";
import FileTableHeader from "./FileTableHeader";
import FileTableRow from "./FileTableRow";
import type { FolderOrFileItem } from "@/features/folder/types";

type FileTableProps = {
  data: FolderOrFileItem[]; 
  columns: ColumnDef<FolderOrFileItem, any>[];
  onRowClick?: (file: FolderOrFileItem) => void;
  onDropFolder?: (sourceFolderId: string, targetFolderId: string | null) => void;
};

function FileTable({ data, columns, onRowClick, onDropFolder }: FileTableProps) {
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
          <FileTableRow key={row.id} row={row} onClick={onRowClick} onDropFolder={onDropFolder} />
        ))}
      </TableBody>
    </Table>
  );
}

export default FileTable;
