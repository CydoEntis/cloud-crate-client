// CrateActionsMenu.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useUserStore } from "@/features/auth";
import type { Crate } from "../types/Crate";
import { useLeaveCrate } from "../hooks/mutations/useLeaveCrate";
import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";

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
        <DropdownMenuTrigger asChild className="border-none">
          <div className="flex justify-end w-full">
            <button className="p-1 hover:bg-muted rounded cursor-pointer" onClick={(e) => e.stopPropagation()}>
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-secondary border-none ">
          <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          {isOwner ? (
            <DropdownMenuItem onClick={handleDelete} className="text-destructive">
              Delete
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onClick={handleLeave} className="text-destructive">
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
