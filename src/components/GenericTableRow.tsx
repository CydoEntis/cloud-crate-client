import { TableRow, TableCell } from "@/components/ui/table";
import { flexRender, type Row } from "@tanstack/react-table";
import clsx from "clsx";

type GenericTableRowProps<TData> = {
  row: Row<TData>;
  rowIndex: number;
  onClickRow?: (row: Row<TData>, e: React.MouseEvent) => void;
  onDoubleClickRow?: (row: Row<TData>, e: React.MouseEvent) => void;
  onDragStartRow?: (row: Row<TData>, e: React.DragEvent) => void;
  onDropOnRow?: (row: Row<TData>, droppedData: any) => void;
  className?: string | ((row: Row<TData>) => string);
};

function GenericTableRow<TData>({
  row,
  rowIndex,
  onClickRow,
  onDoubleClickRow,
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

  const rowClassName = clsx(
    "transition-colors cursor-pointer border-transparent !border-b border-accent",
    "hover:!bg-muted/50",
    typeof className === "function" ? className(row) : className
  );

  return (
    <TableRow
      key={row.id}
      draggable={!!onDragStartRow}
      onClick={(e) => onClickRow?.(row, e)}
      onDoubleClick={(e) => onDoubleClickRow?.(row, e)}
      onDragStart={(e) => onDragStartRow?.(row, e)}
      onDragOver={(e) => onDropOnRow && e.preventDefault()}
      onDrop={handleDrop}
      className={rowClassName}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className={clsx("px-4 py-3 text-foreground", cell.column.id === "actions" && "justify-end flex")}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export default GenericTableRow;
