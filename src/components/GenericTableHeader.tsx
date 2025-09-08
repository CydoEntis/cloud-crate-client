import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { flexRender, type Table } from "@tanstack/react-table";
import clsx from "clsx";

type GenericTableHeaderProps<TData> = {
  table: Table<TData>;
  className?: string;
};

function GenericTableHeader<TData>({ table, className }: GenericTableHeaderProps<TData>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="p-0 border-none text-foreground bg-background">
          {headerGroup.headers.map((header, index) => {
            if (header.isPlaceholder) return null;

            return (
              <TableHead
                key={header.id}
                className={clsx(
                  "px-4 py-2 font-semibold bg-background",
                  index === 0 && "rounded-tl-xl", // left-most cell
                  index === headerGroup.headers.length - 1 && "rounded-tr-xl", // right-most cell
                  index === 0 ? "text-left" : "text-right",
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
