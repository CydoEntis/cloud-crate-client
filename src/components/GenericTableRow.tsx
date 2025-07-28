import { TableRow, TableCell } from "@/components/ui/table";
import { flexRender, type Row } from "@tanstack/react-table";
import clsx from "clsx";

type GenericTableRowProps<TData> = {
  row: Row<TData>;
  onClickRow?: (row: Row<TData>, e: React.MouseEvent) => void;
  onDragStartRow?: (row: Row<TData>, e: React.DragEvent) => void;
  onDropOnRow?: (row: Row<TData>, droppedData: any) => void;
  className?: string | ((row: Row<TData>) => string);
};

function GenericTableRow<TData>({
  row,
  onClickRow,
  onDragStartRow,
  onDropOnRow,
  className,
}: GenericTableRowProps<TData>) {
  const handleDrop = (e: React.DragEvent) => {
    if (!onDropOnRow) return;
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      onDropOnRow(row, data);
    } catch (err) {
      console.error("Failed to parse drag data:", err);
    }
  };

  return (
    <TableRow
      key={row.id}
      draggable={!!onDragStartRow}
      onClick={(e) => onClickRow?.(row, e)}
      onDragStart={(e) => onDragStartRow?.(row, e)}
      onDragOver={(e) => onDropOnRow && e.preventDefault()}
      onDrop={handleDrop}
      className="p-0 border-none"
    >
      <TableCell colSpan={row.getVisibleCells().length} className="p-0 border-none">
        <div
          className={clsx(
            "bg-white rounded-lg shadow border border-gray-200 transition-colors hover:bg-muted/20",
            typeof className === "function" ? className(row) : className
          )}
        >
          <div className="flex">
            {row.getVisibleCells().map((cell) => (
              <div
                key={cell.id}
                className={clsx("p-4", cell.column.id === "controls" && "justify-end flex")}
                style={{ width: `${cell.column.getSize()}%` }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default GenericTableRow;
