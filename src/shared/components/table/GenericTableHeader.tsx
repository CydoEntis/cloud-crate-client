import { flexRender, type Table } from "@tanstack/react-table";
import clsx from "clsx";
import { TableHead, TableHeader, TableRow } from "../ui/table";

type GenericTableHeaderProps<TData> = {
  table: Table<TData>;
  className?: string;
};

function GenericTableHeader<TData>({ table, className }: GenericTableHeaderProps<TData>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="p-0 border-none text-foreground hover:bg-transparent">
          {headerGroup.headers.map((header, index) => {
            if (header.isPlaceholder) return null;

            return (
              <TableHead
                key={header.id}
                className={clsx(
                  "px-4 py-2 font-semibold text-muted-foreground border-b border-accent hover:bg-transparent",
                  className
                )}
                style={{
                  width: header.getSize() ? `${header.getSize()}%` : undefined,
                }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export default GenericTableHeader;
