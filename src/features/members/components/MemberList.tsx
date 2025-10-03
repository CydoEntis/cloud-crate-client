import { Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { CrateRole } from "@/features/crates/crateTypes";
import { useUserStore } from "@/features/user/userStore";
import type { Member } from "../memberTypes";

type MembersListProps = {
  members: Member[];
  currentUserRole: CrateRole;
  onRoleChange: (userId: string, newRole: CrateRole) => void;
  onRemoveMember: (userId: string) => void;
  isLoading?: boolean;
};

function MembersList({ members, currentUserRole, onRoleChange, onRemoveMember, isLoading = false }: MembersListProps) {
  const { user } = useUserStore();
  const currentUserId = user?.id;

  const canManageRoles = currentUserRole === CrateRole.Owner || currentUserRole === CrateRole.Manager;
  const canRemoveMembers = currentUserRole === CrateRole.Owner || currentUserRole === CrateRole.Manager;

  const canEditMember = (member: Member) => {
    if (!canManageRoles) return false;
    if (member.role === CrateRole.Owner) return false;
    if (member.userId === currentUserId) return false;
    return true;
  };

  const canRemoveMember = (member: Member) => {
    if (!canRemoveMembers) return false;
    if (member.role === CrateRole.Owner) return false;
    if (member.userId === currentUserId) return false;
    return true;
  };

  const getAvailableRoles = () => {
    const allRoles = Object.values(CrateRole).filter((role) => role !== CrateRole.Owner);
    if (currentUserRole === CrateRole.Manager) {
      return allRoles.filter((role) => role !== CrateRole.Manager);
    }
    return allRoles;
  };

  if (members.length === 0) {
    return (
      <div>
        <h3 className="font-medium text-sm mb-3">Members of Crate</h3>
        <p className="text-sm text-muted-foreground">No members found.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-medium text-xs sm:text-sm mb-3">Members of Crate ({members.length})</h3>
      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member.userId}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarImage src={member.profilePicture} alt={member.displayName} />
                <AvatarFallback className="text-xs">{member.displayName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{member.displayName}</p>
                  {member.userId === currentUserId && (
                    <span className="text-xs text-muted-foreground flex-shrink-0">(You)</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:ml-auto pl-11 sm:pl-0">
              {member.role === CrateRole.Owner ? (
                <span className="text-sm font-medium text-primary">Owner</span>
              ) : canEditMember(member) ? (
                <Select
                  value={member.role}
                  onValueChange={(value: string) => onRoleChange(member.userId, value as CrateRole)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-[110px] sm:w-[120px] h-8 border-0 disabled:opacity-50 text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-muted">
                    {getAvailableRoles().map((role) => (
                      <SelectItem key={role} value={role} className="text-xs sm:text-sm">
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <span className="text-sm font-medium text-muted-foreground">{member.role}</span>
              )}

              {canRemoveMember(member) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveMember(member.userId)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2"
                  disabled={isLoading}
                  title="Remove member"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-4">
          <div className="text-sm text-muted-foreground">Updating...</div>
        </div>
      )}
    </div>
  );
}

export default MembersList;
