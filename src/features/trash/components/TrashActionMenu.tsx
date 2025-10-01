import { MoreHorizontal, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { TrashItem } from "../trashTypes";

type TrashActionMenuProps = {
  item: TrashItem;
  onRestore?: (item: TrashItem) => void;
  onDelete?: (item: TrashItem) => void;
};

const TrashActionMenu = ({ item, onRestore, onDelete }: TrashActionMenuProps) => {
  const canModify = item.canRestore || item.canPermanentlyDelete;

  if (!canModify) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {item.canRestore && onRestore && (
          <DropdownMenuItem onClick={() => onRestore(item)}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Restore
          </DropdownMenuItem>
        )}
        {item.canPermanentlyDelete && onDelete && (
          <DropdownMenuItem onClick={() => onDelete(item)} className="text-destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Permanently
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TrashActionMenu;
