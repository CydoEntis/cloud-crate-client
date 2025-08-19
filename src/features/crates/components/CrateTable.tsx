import { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { Table, TableBody } from "@/components/ui/table";
import GenericTableHeader from "@/components/GenericTableHeader";
import GenericTableRow from "@/components/GenericTableRow";
import type { Crate } from "../types/Crate";
import { useNavigate } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "usehooks-ts";

type CrateTableProps = {
  data: Crate[];
  columns: ColumnDef<Crate, any>[];
  isLoading?: boolean;
};

function CrateTable({ data, columns, isLoading }: CrateTableProps) {
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 719px)");
  const isTablet = useMediaQuery("(min-width: 720px) and (max-width: 1199px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const [columnVisibility, setColumnVisibility] = useState({});

  useEffect(() => {
    if (isMobile) {
      setColumnVisibility({
        name: true,
        owner: false,
        storage: false,
        joinedAt: false,
        actions: true,
      });
    } else if (isTablet) {
      setColumnVisibility({
        name: true,
        owner: true,
        storage: false,
        joinedAt: false,
        actions: true,
      });
    } else if (isDesktop) {
      setColumnVisibility({
        name: true,
        owner: true,
        storage: true,
        joinedAt: true,
        actions: true,
      });
    }
  }, [isMobile, isTablet, isDesktop]);

  const table = useReactTable<Crate>({
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

  const onNavigateToCrate = (crateId: string) => {
    navigate({ to: `/crates/${crateId}` });
  };

  const getRowClass = () => "hover:bg-muted/20";

  return (
    <Table>
      <GenericTableHeader table={table} />
      <TableBody>
        {isLoading
          ? Array.from({ length: 20 }).map((_, i) => (
              <tr key={i} className="h-10">
                <td colSpan={columns.length}>
                  <Skeleton className="w-full h-10 mt-2" />
                </td>
              </tr>
            ))
          : table
              .getRowModel()
              .rows.map((row, index) => (
                <GenericTableRow<Crate>
                  key={row.id}
                  row={row}
                  rowIndex={index}
                  className={getRowClass()}
                  onClickRow={() => onNavigateToCrate(row.original.id)}
                />
              ))}
      </TableBody>
    </Table>
  );
}

export default CrateTable;
