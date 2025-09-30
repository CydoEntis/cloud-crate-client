import { MoreVertical, RotateCcw, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { TrashItem } from "../trashTypes";
import type { Member } from "@/features/members/memberTypes";
import { CrateRole } from "@/features/crates/crateTypes";

type TrashActionMenuProps = {
  item: TrashItem;
  currentMember?: Member;
  onRestore?: (item: TrashItem) => void;
  onDelete?: (item: TrashItem) => void;
};

function TrashActionMenu({ item, currentMember, onRestore, onDelete }: TrashActionMenuProps) {
  const canModify = currentMember
    ? currentMember.role === CrateRole.Owner ||
      currentMember.role === CrateRole.Manager ||
      (item.canRestore && item.canPermanentlyDelete)
    : false;

  if (!canModify) {
    return null;
  }

  return (
    <div className="actions-cell flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {item.canRestore && (
            <DropdownMenuItem onClick={() => onRestore?.(item)} className="cursor-pointer">
              <RotateCcw className="mr-2 h-4 w-4" />
              Restore
            </DropdownMenuItem>
          )}
          {item.canPermanentlyDelete && (
            <DropdownMenuItem
              onClick={() => onDelete?.(item)}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Permanently
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TrashActionMenu;
