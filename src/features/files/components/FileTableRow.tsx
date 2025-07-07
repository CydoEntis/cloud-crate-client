import { TableRow, TableCell } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { FolderItemType, type FolderOrFileItem } from "@/features/folder";

type FileTableRowProps = {
  row: any;
  onClick?: (file: FolderOrFileItem) => void;
  onDropFolder?: (sourceFolderId: string, targetFolderId: string) => void;
};

function FileTableRow({ row, onClick, onDropFolder }: FileTableRowProps) {
  const rowData: FolderOrFileItem = row.original;

  const isFolder = rowData.type === FolderItemType.Folder;

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
          e.dataTransfer.setData("text/plain", rowData.id);
        }
      }}
      onDragOver={(e) => {
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
