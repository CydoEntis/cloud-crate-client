import { MoreHorizontal, Shield, ShieldOff, Ban, Trash2, UserCheck, Settings } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
} from "@/shared/components/ui/dropdown-menu";
import { SubscriptionPlan, type AdminUser } from "../adminTypes";

type AdminUserActionsMenuProps = {
  user: AdminUser;
  onBan: (id: string) => void;
  onUnban: (id: string) => void;
  onMakeAdmin: (id: string) => void;
  onRemoveAdmin: (id: string) => void;
  onUpdatePlan?: (id: string, plan: SubscriptionPlan) => void;
};

function AdminUserActionsMenu({
  user,
  onBan,
  onUnban,
  onMakeAdmin,
  onRemoveAdmin,
  onUpdatePlan,
}: AdminUserActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border-muted">
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="border-accent">
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

        {onUpdatePlan && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Settings className="mr-2 h-4 w-4" />
              Change Plan
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="border-accent">
              <DropdownMenuItem onClick={() => onUpdatePlan(user.id, SubscriptionPlan.Free)}>Free</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdatePlan(user.id, SubscriptionPlan.Mini)}>Mini</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdatePlan(user.id, SubscriptionPlan.Standard)}>
                Standard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onUpdatePlan(user.id, SubscriptionPlan.Max)}>Max</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AdminUserActionsMenu;
