import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { Table, TableBody } from "@/components/ui/table";
import FileTableHeader from "./FileTableHeader";
import FileTableRow from "./FileTableRow";
import type { StoredFile } from "@/features/files/types";

type FileTableProps = {
  data: StoredFile[];
  columns: ColumnDef<StoredFile, any>[];
  onRowClick?: (file: StoredFile) => void;
  onDropFolder?: (sourceFolderId: string, targetFolderId: string) => void;
};

function FileTable({ data, columns, onRowClick, onDropFolder }: FileTableProps) {
  const table = useReactTable<StoredFile>({
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
