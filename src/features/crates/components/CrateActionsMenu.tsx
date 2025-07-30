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

type CrateActionsMenuProps = {
  crate: Crate;
  onEdit: (crate: Crate) => void;
  onDelete: (crateId: string) => void;
};

function CrateActionsMenu({ crate, onEdit, onDelete }: CrateActionsMenuProps) {
  const { user } = useUserStore();
  const isOwner = user?.email === crate.owner.email;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(crate);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("delete", crate.id);
    onDelete(crate.id);
  };

  const handleLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("leave", crate.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <div className="flex justify-end w-full">
          <button className="p-1 hover:bg-muted rounded cursor-pointer" onClick={(e) => e.stopPropagation()}>
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        {isOwner ? (
          <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="text-destructive" onClick={handleLeave}>
            Leave
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CrateActionsMenu;
