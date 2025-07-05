import { TableRow, TableCell } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import type { StoredFile } from "@/features/files/types";

type FileTableRowProps = {
  row: any;
  onClick?: (file: StoredFile) => void;
};

function FileTableRow({ row, onClick }: FileTableRowProps) {
  const rowData: StoredFile = row.original;
  return (
    <TableRow
      key={row.id}
      onClick={(event) => {
        if (rowData.isFolder && !(event.target as HTMLElement).closest(".actions-cell")) {
          onClick?.(rowData);
        }
      }}
      className={rowData.isFolder ? "cursor-pointer hover:bg-muted/30" : ""}
    >
      {row.getVisibleCells().map((cell: any) => (
        <TableCell
          key={cell.id}
          className={`p-4 ${cell.column.id === "controls" ? "actions-cell justify-end flex" : ""}`}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default FileTableRow;
