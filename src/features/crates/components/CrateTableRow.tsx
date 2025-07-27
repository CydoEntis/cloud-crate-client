import { TableRow, TableCell } from "@/components/ui/table";
import type { Crate } from "../types/Crate";
import { flexRender, type Row } from "@tanstack/react-table";

function CrateTableRow({ row }: { row: Row<Crate> }) {
  return (
    <TableRow key={row.id} className="hover:bg-muted/20">
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
      ))}
    </TableRow>
  );
}

export default CrateTableRow;
