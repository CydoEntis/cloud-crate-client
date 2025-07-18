import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";
import type { StoredFile } from "@/features/files/types";
import type { FolderOrFileItem } from "@/features/folder";

type FileTableHeaderProps = {
  table: Table<FolderOrFileItem>;
};

function FileTableHeader({ table }: FileTableHeaderProps) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export default FileTableHeader;
