import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { CrateRole } from "@/features/crates/crateTypes";

type Member = {
  userId: string;
  displayName: string;
  email: string;
  profilePicture: string;
  role: CrateRole;
};

type MembersListProps = {
  members: Member[];
  onRoleChange: (userId: string, newRole: CrateRole) => void;
  onRemoveMember: (userId: string) => void;
};

function MembersList({ members, onRoleChange, onRemoveMember }: MembersListProps) {
  return (
    <div>
      <h3 className="font-medium text-sm mb-3">Members of Crate</h3>
      <div className="space-y-3">
        {members.map((member) => (
          <div key={member.userId} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.profilePicture} alt={member.displayName} />
                  <AvatarFallback className="text-xs">{member.displayName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{member.displayName}</p>
                <p className="text-xs text-gray-500 truncate">{member.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {member.role === CrateRole.Owner ? (
                <div className="w-[120px] h-8 px-3 py-1 text-primary border border-primary rounded-md text-sm flex items-center justify-center">
                  Owner
                </div>
              ) : (
                <Select
                  value={member.role}
                  onValueChange={(value: string) => onRoleChange(member.userId, value as CrateRole)}
                >
                  <SelectTrigger className="w-[120px] h-8 border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-muted">
                    {Object.values(CrateRole)
                      .filter((role) => role !== CrateRole.Owner) // Don't allow promoting to Owner
                      .map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}

              {/* Owner cannot remove themselves */}
              {member.role !== CrateRole.Owner && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveMember(member.userId)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MembersList;
