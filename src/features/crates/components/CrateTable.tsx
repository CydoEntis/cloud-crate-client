import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { Table, TableBody } from "@/components/ui/table";
import { FileTableHeader } from "@/features/files/components";
import CrateTableRow from "./CrateTableRow";
import type { Crate } from "../types/Crate";

type CrateTableProps = {
  data: Crate[];
  columns: ColumnDef<Crate, any>[];
};

function CrateTable({ data, columns }: CrateTableProps) {
  const table = useReactTable<Crate>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <FileTableHeader table={table} />
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <CrateTableRow key={row.id} row={row} />
        ))}
      </TableBody>
    </Table>
  );
}

export default CrateTable;
