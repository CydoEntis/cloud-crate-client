import { MoreVertical } from "lucide-react";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import ConfirmDialog from "@/shared/components/ConfirmDialog";
import { useUserStore } from "@/features/user/userStore";
import type { Crate } from "../crateTypes";

type CrateActionsMenuProps = {
  crate: Crate;
  onEdit: (crate: Crate) => void;
  onDelete: (crateId: string) => void;
  onLeave: (crateId: string) => void;
};

function CrateActionsMenu({ crate, onEdit, onDelete, onLeave }: CrateActionsMenuProps) {
  const { user } = useUserStore();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => () => {});

  const isOwner = user?.email === crate.owner.email;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(crate);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmAction(() => () => onDelete(crate.id));
    setConfirmOpen(true);
  };

  const handleLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setConfirmAction(() => () => onLeave(crate.id));
    setConfirmOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="border-muted">
          <div className="flex justify-end w-full">
            <button className="p-1 hover:bg-muted rounded cursor-pointer" onClick={(e) => e.stopPropagation()}>
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-2 border-muted cursor-pointer ">
          <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
            Edit
          </DropdownMenuItem>
          {isOwner ? (
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive cursor-pointer hover:!text-white hover:!bg-destructive"
            >
              Delete
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={handleLeave}
              className="text-destructive cursor-pointer hover:!text-white hover:!bg-destructive"
            >
              Leave
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          confirmAction();
          setConfirmOpen(false);
        }}
        title={isOwner ? "Delete Crate?" : "Leave Crate?"}
        description={
          isOwner
            ? "Are you sure you want to delete this crate? This action cannot be undone."
            : "Are you sure you want to leave this crate?"
        }
        confirmLabel={isOwner ? "Delete" : "Leave"}
      />
    </>
  );
}

export default CrateActionsMenu;
