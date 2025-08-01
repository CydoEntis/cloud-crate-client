import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { Table, TableBody } from "@/components/ui/table";
import GenericTableHeader from "@/components/GenericTableHeader";
import GenericTableRow from "@/components/GenericTableRow";
import type { Crate } from "../types/Crate";
import { useNavigate } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have this component

type CrateTableProps = {
  data: Crate[];
  columns: ColumnDef<Crate, any>[];
  isLoading?: boolean;
};

function CrateTable({ data, columns, isLoading }: CrateTableProps) {
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
    navigate({ to: `/crates/${crateId}` });
  };

  const getRowClass = () => "hover:bg-muted/20";
  console.log(isLoading)
  return (
    <Table className="border-separate border-spacing-y-2">
      <GenericTableHeader table={table} />
      <TableBody>
        {isLoading
          ? Array.from({ length: 20 }).map((_, i) => (
              <tr key={i} className="h-10">
                <td colSpan={columns.length}>
                  <Skeleton className="w-full h-10" />
                </td>
              </tr>
            ))
          : table
              .getRowModel()
              .rows.map((row) => (
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
