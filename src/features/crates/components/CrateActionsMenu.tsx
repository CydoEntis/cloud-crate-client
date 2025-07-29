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
import { useUpdateCrate } from "../hooks/mutations/useUpdateCrate";

type CrateActionsMenuProps = {
  crate: Crate;
  onEdit: (crate: Crate) => void;
};

function CrateActionsMenu({ crate, onEdit }: CrateActionsMenuProps) {
  const { user } = useUserStore();
  const isOwner = user?.email === crate.owner.email;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(crate);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("delete", crate.id);
  };

  const handleLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("leave", crate.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1 hover:bg-muted rounded" onClick={(e) => e.stopPropagation()}>
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
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
