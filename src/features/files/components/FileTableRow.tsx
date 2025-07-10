import { TableRow, TableCell } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { FolderItemType, type DragItemType, type FolderOrFileItem } from "@/features/folder";

type FileTableRowProps = {
  row: any;
  onNavigate?: (folderId: string | null) => void;
  onDropItem?: (itemId: string, itemType: DragItemType, targetFolderId: string | null) => void;
};

function FileTableRow({ row, onNavigate, onDropItem }: FileTableRowProps) {
  const rowData: FolderOrFileItem = row.original;

  const isFolder = rowData.type === FolderItemType.Folder;
  const isBackRow = rowData.isBackRow;

  return (
    <TableRow
      key={row.id}
      draggable
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest(".actions-cell")) {
          if (isBackRow) {
            console.log("[Click] Back row clicked. Navigating back to:", rowData.parentOfCurrentFolderId ?? null);
            onNavigate?.(rowData.parentOfCurrentFolderId ?? null);
          } else if (isFolder) {
            console.log("[Click] Folder clicked. Navigating into:", rowData.id);
            onNavigate?.(rowData.id);
          }
        }
      }}
      onDragStart={(e) => {
        console.log("[DragStart] Dragging item:", rowData.id, "Type:", rowData.type);
        e.dataTransfer.setData("application/json", JSON.stringify({ id: rowData.id, type: rowData.type }));
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("application/json");
        try {
          const dragged = JSON.parse(data) as {
            id: string;
            type: DragItemType;
          };

          const targetFolderId = isBackRow ? (rowData.parentOfCurrentFolderId ?? null) : rowData.id;

          console.log("[Drop] Dropped item:", dragged, "On target folder:", targetFolderId);

          if (dragged.id !== rowData.id) {
            onDropItem?.(dragged.id, dragged.type, targetFolderId);
          } else {
            console.log("[Drop] Ignored drop on self:", dragged.id);
          }
        } catch (err) {
          console.error("[Drop] Failed to parse drag data:", err);
        }
      }}
      className={isFolder || isBackRow ? "cursor-pointer hover:bg-muted/30" : ""}
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
