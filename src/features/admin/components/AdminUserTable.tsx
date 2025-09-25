// features/admin/components/AdminUserTable.tsx
import { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { useMediaQuery } from "usehooks-ts";
import { Table, TableBody } from "@/shared/components/ui/table";
import GenericTableHeader from "@/shared/components/GenericTableHeader";
import { Skeleton } from "@/shared/components/ui/skeleton";
import GenericTableRow from "@/shared/components/GenericTableRow";
import type { AdminUser } from "../adminTypes";

type AdminUserTableProps = {
  data: AdminUser[];
  columns: ColumnDef<AdminUser, any>[];
  isLoading?: boolean;
};

function AdminUserTable({ data, columns, isLoading }: AdminUserTableProps) {
  const isMobile = useMediaQuery("(max-width: 719px)");
  const isTablet = useMediaQuery("(min-width: 720px) and (max-width: 1199px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const [columnVisibility, setColumnVisibility] = useState({});

  useEffect(() => {
    if (isMobile) {
      setColumnVisibility({
        displayName: true,
        plan: false,
        usedStorageBytes: false,
        isAdmin: false,
        isLocked: false,
        createdAt: false,
        actions: true,
      });
    } else if (isTablet) {
      setColumnVisibility({
        displayName: true,
        plan: true,
        usedStorageBytes: false,
        isAdmin: false,
        isLocked: false,
        createdAt: false,
        actions: true,
      });
    } else if (isDesktop) {
      setColumnVisibility({
        displayName: true,
        plan: true,
        usedStorageBytes: true,
        isAdmin: true,
        isLocked: true,
        createdAt: true,
        actions: true,
      });
    }
  }, [isMobile, isTablet, isDesktop]);

  const table = useReactTable<AdminUser>({
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

  const getRowClass = (user: AdminUser) => {
    let baseClass = "hover:bg-muted/20";
    if (user.isLocked) {
      baseClass += " opacity-60";
    }
    return baseClass;
  };

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
                <GenericTableRow<AdminUser>
                  key={row.id}
                  row={row}
                  rowIndex={index}
                  className={getRowClass(row.original)}
                />
              ))}
      </TableBody>
    </Table>
  );
}

export default AdminUserTable;
