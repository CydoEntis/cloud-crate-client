import { TableRow, TableCell } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import type { StoredFile } from "@/features/files/types";

type FileTableRowProps = {
  row: any;
  onClick?: (file: StoredFile) => void;
  onDropFolder?: (sourceFolderId: string, targetFolderId: string) => void;
};

function FileTableRow({ row, onClick, onDropFolder }: FileTableRowProps) {
  const rowData: StoredFile = row.original;

  const isFolder = rowData.isFolder;

  return (
    <TableRow
      key={row.id}
      draggable={isFolder}
      onClick={(event) => {
        if (isFolder && !(event.target as HTMLElement).closest(".actions-cell")) {
          onClick?.(rowData);
        }
      }}
      onDragStart={(e) => {
        if (isFolder) {
          e.dataTransfer.setData("text/plain", rowData.id); // drag source folderId
        }
      }}
      onDragOver={(e) => {
        // Allow dropping on folders only
        if (isFolder) {
          e.preventDefault();
        }
      }}
      onDrop={(e) => {
        const draggedId = e.dataTransfer.getData("text/plain");
        if (isFolder && draggedId && draggedId !== rowData.id) {
          onDropFolder?.(draggedId, rowData.id);
        }
      }}
      className={isFolder ? "cursor-pointer hover:bg-muted/30" : ""}
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
