import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderItemType } from "@/features/folder/types/FolderItemType";
import type { FolderOrFileItem } from "@/features/folder/types/FolderOrFileItem";
import { MoreVertical } from "lucide-react";

function ActionsCell({ row }: { row: FolderOrFileItem }) {
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
}

export default ActionsCell;
