import { useState } from "react";
import { X, Info, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { CrateRole } from "@/features/crates/crateTypes";
import SearchInputField from "@/shared/components/SearchInputField";
import { usePaginatedMembers } from "@/features/members/api/memberQueries";

type InviteModalProps = {
  isOpen: boolean;
  crateId: string;
  onClose: () => void;
};

function InviteModal({ isOpen, onClose, crateId }: InviteModalProps) {
  const { data: paginatedResult, isLoading, error } = usePaginatedMembers(crateId);
  const members = paginatedResult?.items || [];
  const [searchValue, setSearchValue] = useState("");

  const handleRoleChange = (userId: string, newRole: CrateRole) => {
    console.log(`Change ${userId} role to ${newRole}`);
  };

  const handleRemoveMember = (userId: string) => {
    console.log(`Remove member ${userId}`);
  };

  const handleInvite = () => {
    console.log(`Invite ${searchValue}`);
    setSearchValue("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto text-foreground border-muted">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-semibold text-left">Invite to crate</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mb-4">
          <p className="text-sm text-muted-foreground">Invite your team to collaborate on this crate.</p>
          <div className="flex items-center gap-2">
            <SearchInputField value={searchValue} onChange={setSearchValue} placeholder="Enter email to invite" />
            <Button variant="outline" ><UserPlus /> Invite</Button>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3">Members of Crate</h3>
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.userId} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.profilePicture} alt={member.displayName} />
                        <AvatarFallback className="text-xs">
                          {member.displayName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{member.displayName}</p>
                      <p className="text-xs text-gray-500 truncate">{member.email}</p>
                    </div>
                  </div>

                  {/* Replace DropdownMenu with Select */}
                  <div className="flex items-center gap-2">
                    <Select
                      value={member.role}
                      onValueChange={(newRole: CrateRole) => handleRoleChange(member.userId, newRole)}
                    >
                      <SelectTrigger className="w-[120px] h-8  border-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-muted">
                        {Object.values(CrateRole).map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Remove button for non-owners */}
                    {member.role !== CrateRole.Owner && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveMember(member.userId)}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteModal;
