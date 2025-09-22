import { MoreHorizontal, Shield, ShieldOff, Ban, Trash2, UserCheck } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { AdminUser } from "../adminTypes";

type AdminUserActionsMenuProps = {
  user: AdminUser;
  onBan: (id: string) => void;
  onUnban: (id: string) => void;
  onDelete: (id: string) => void;
  onMakeAdmin: (id: string) => void;
  onRemoveAdmin: (id: string) => void;
};

function AdminUserActionsMenu({
  user,
  onBan,
  onUnban,
  onDelete,
  onMakeAdmin,
  onRemoveAdmin,
}: AdminUserActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border-muted">
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-2 border-muted cursor-pointer">
        {user.isAdmin ? (
          <DropdownMenuItem onClick={() => onRemoveAdmin(user.id)}>
            <ShieldOff className="mr-2 h-4 w-4" />
            Remove Admin
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => onMakeAdmin(user.id)}>
            <Shield className="mr-2 h-4 w-4" />
            Make Admin
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {user.isLocked ? (
          <DropdownMenuItem onClick={() => onUnban(user.id)}>
            <UserCheck className="mr-2 h-4 w-4" />
            Unban User
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => onBan(user.id)}>
            <Ban className="mr-2 h-4 w-4" />
            Ban User
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onDelete(user.id)} className="text-destructive focus:text-destructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AdminUserActionsMenu;
