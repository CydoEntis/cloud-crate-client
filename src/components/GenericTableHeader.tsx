import { TableHeader, TableRow, TableCell } from "@/components/ui/table";
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
        <TableRow key={headerGroup.id} className="p-0 border-none hover:bg-none">
          <TableCell colSpan={headerGroup.headers.length} className="p-0 border-none hover:bg-none">
            <div className={clsx("border-b hover:bg-transparent", className)}>
              <div className="flex">
                {headerGroup.headers.map((header, index) => (
                  <div
                    key={header.id}
                    className={clsx("p-4 font-semibold hover:bg-none", index === 0 ? "text-left flex-1" : "text-right")}
                    style={{ width: `${header.column.getSize()}%` }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                ))}
              </div>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableHeader>
  );
}

export default GenericTableHeader;
