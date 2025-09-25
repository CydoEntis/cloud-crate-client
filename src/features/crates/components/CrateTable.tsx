import { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "@tanstack/react-router";
import { useMediaQuery } from "usehooks-ts";
import { Table, TableBody } from "@/shared/components/ui/table";
import GenericTableHeader from "@/shared/components/table/GenericTableHeader";
import { Skeleton } from "@/shared/components/ui/skeleton";
import GenericTableRow from "@/shared/components/table/GenericTableRow";
import type { Crate, CrateSummary } from "../crateTypes";

type CrateTableProps = {
  data: CrateSummary[];
  columns: ColumnDef<CrateSummary, any>[];
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

  const table = useReactTable<CrateSummary>({
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
    <Table className="">
      <GenericTableHeader table={table} />
      <TableBody>
        {isLoading
          ? Array.from({ length: 20 }).map((_, i) => (
              <tr key={i} className="h-10">
                <td colSpan={columns.length}>
                  <Skeleton className="w-full h-10 mt-2 bg-accent" />
                </td>
              </tr>
            ))
          : table
              .getRowModel()
              .rows.map((row, index) => (
                <GenericTableRow<CrateSummary>
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
