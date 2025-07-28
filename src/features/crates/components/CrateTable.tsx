import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { Table, TableBody } from "@/components/ui/table";
import GenericTableHeader from "@/components/GenericTableHeader"; // Use your generic header
import GenericTableRow from "@/components/GenericTableRow";
import type { Crate } from "../types/Crate";
import { useNavigate } from "@tanstack/react-router";

type CrateTableProps = {
  data: Crate[];
  columns: ColumnDef<Crate, any>[];
};

function CrateTable({ data, columns }: CrateTableProps) {
  const navigate = useNavigate();
  const table = useReactTable<Crate>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    enableColumnResizing: true,
    defaultColumn: {
      size: 10,
    },
  });

  const onNavigateToCrate = (crateId: string) => {
    console.log(crateId);
    navigate({ to: `/crates/${crateId}` });
  };

  const getRowClass = () => "hover:bg-muted/20";

  return (
    <Table className="border-separate border-spacing-y-2">
      <GenericTableHeader table={table} />
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <GenericTableRow<Crate>
            key={row.id}
            row={row}
            className={getRowClass()}
            onClickRow={() => onNavigateToCrate(row.original.id)}
          />
        ))}
      </TableBody>
    </Table>
  );
}

export default CrateTable;
