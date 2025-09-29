import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { CrateSummary } from "../crateTypes";
import { useCrateModalStore } from "../store/crateModalStore";
import { CrateRole } from "../crateTypes";

type CrateActionsMenuProps = {
  crate: CrateSummary;
  onDelete: (crate: CrateSummary) => void;
  onLeave: (crate: CrateSummary) => void;
};

function CrateActionsMenu({ crate, onDelete, onLeave }: CrateActionsMenuProps) {
  const { open } = useCrateModalStore();

  const canEdit = crate.currentUserRole === CrateRole.Owner || crate.currentUserRole === CrateRole.Manager;
  const canDelete = crate.currentUserRole === CrateRole.Owner;
  const canLeave = crate.currentUserRole !== CrateRole.Owner;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    open(crate.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(crate);
  };

  const handleLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLeave(crate);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border-muted">
        <div className="flex justify-end w-full">
          <button className="p-1 hover:bg-muted rounded cursor-pointer" onClick={(e) => e.stopPropagation()}>
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-2 border-muted cursor-pointer">
        {canEdit && (
          <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
            Edit
          </DropdownMenuItem>
        )}

        {canDelete ? (
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-destructive cursor-pointer hover:!text-white hover:!bg-destructive"
          >
            Delete
          </DropdownMenuItem>
        ) : canLeave ? (
          <DropdownMenuItem
            onClick={handleLeave}
            className="text-destructive cursor-pointer hover:!text-white hover:!bg-destructive"
          >
            Leave
          </DropdownMenuItem>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CrateActionsMenu;
