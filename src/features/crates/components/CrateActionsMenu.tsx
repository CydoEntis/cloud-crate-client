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

type CrateActionsMenuProps = {
  crate: Crate;
  onEdit: (crate: Crate) => void;
  onDelete: (crateId: string) => void;
  onLeave: (crateId: string) => void;
};

function CrateActionsMenu({ crate, onEdit, onDelete, onLeave }: CrateActionsMenuProps) {
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
    onLeave(crate.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border-none">
        <div className="flex justify-end w-full">
          <button className="p-1 hover:bg-muted rounded cursor-pointer" onClick={(e) => e.stopPropagation()}>
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-secondary border-none ">
        <DropdownMenuItem className="hover:bg-card cursor-pointer transition-all duration-300" onClick={handleEdit}>Edit</DropdownMenuItem>
        {isOwner ? (
          <DropdownMenuItem className="hover:bg-card cursor-pointer transition-all duration-300 text-destructive" onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="hover:bg-card cursor-pointer transition-all duration-300 text-destructive" onClick={handleLeave}>
            Leave
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CrateActionsMenu;
