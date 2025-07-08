import FileIndicator from "@/components/FileIndicator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import type { FolderOrFileItem } from "@/features/folder/types";
import { FolderItemType } from "@/features/folder/types";

const columnHelper = createColumnHelper<FolderOrFileItem>();

const crateColumns = (options: {
  onFolderClick?: (folderId: string) => void;
  onBackClick?: (parentId: string | null) => void;
  onDropToParent?: (itemIds: string[]) => void;
}) => [
  columnHelper.accessor("name", {
    header: "Name",
    meta: { width: "60%" },
    cell: (info) => {
      const fileName = info.getValue();
      const row = info.row.original as FolderOrFileItem & { isBackRow?: boolean };
      const isBackRow = row.isBackRow === true;

      return (
        <div
          className={`flex gap-2 items-center w-full px-2 py-1 rounded cursor-pointer ${
            isBackRow ? "text-muted-foreground italic hover:bg-muted" : "hover:bg-accent"
          }`}
          onClick={() => {
            if (isBackRow) {
              options.onBackClick?.(row.parentFolderId ?? null);
            } else if (row.type === FolderItemType.Folder) {
              options.onFolderClick?.(row.id);
            }
          }}
          onDragOver={(e) => {
            if (isBackRow) e.preventDefault();
          }}
          onDrop={(e) => {
            if (isBackRow) {
              try {
                const ids = JSON.parse(e.dataTransfer.getData("application/json")) as string[];
                options.onDropToParent?.(ids);
              } catch {
                // ignore invalid JSON or other errors
              }
            }
          }}
        >
          <FileIndicator
            filename={fileName}
            isFolder={row.type === FolderItemType.Folder}
            folderColor={row.color ?? "#9CA3AF"}
          />
          <h4 className="font-bold">{fileName}</h4>
        </div>
      );
    },
  }),

  columnHelper.accessor("sizeInBytes", {
    header: "Size",
    meta: { width: "10%" },
    cell: (info) => {
      const size = info.getValue() as number | undefined;
      if (size === undefined) return <p>-</p>;
      return <p>{size === 0 ? "-" : `${(size / (1024 * 1024)).toFixed(2)} MB`}</p>;
    },
  }),

  columnHelper.display({
    id: "controls",
    meta: { width: "5%" },
    cell: (info) => {
      const row = info.row.original;
      if ((row as any).isBackRow) return null;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
              <MoreVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Rename</DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Delete</DropdownMenuItem>
            {row.type === FolderItemType.Folder && (
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Change Color</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];

export default crateColumns;
