import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { Table, TableBody } from "@/components/ui/table";
import GenericTableHeader from "@/components/GenericTableHeader"; // Use your generic header
import GenericTableRow from "@/components/GenericTableRow";
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

  const getRowClass = () => "hover:bg-muted/20";

  return (
    <Table className="border-separate border-spacing-y-2">
      <GenericTableHeader table={table} />
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <GenericTableRow<Crate> key={row.id} row={row} className={getRowClass()} />
        ))}
      </TableBody>
    </Table>
  );
}

export default CrateTable;
