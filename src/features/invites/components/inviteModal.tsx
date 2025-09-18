import { useState } from "react";
import { Search, ChevronDown, X, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { CrateRole } from "@/features/crates/crateTypes";
import type { Member } from "@/features/members/memberTypes";

type InviteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  crateId: string;
  crateName: string;
  members: Member[];
};

function InviteModal({ isOpen, onClose, crateId, crateName, members }: InviteModalProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleRoleChange = (userId: string, newRole: CrateRole) => {
    // TODO: Implement role change logic
    console.log(`Change ${userId} role to ${newRole}`);
  };

  const handleRemoveMember = (userId: string) => {
    // TODO: Implement remove member logic
    console.log(`Remove member ${userId}`);
  };

  const handleInvite = () => {
    // TODO: Implement invite logic
    console.log(`Invite ${searchValue}`);
    setSearchValue("");
  };

  const getRoleColor = (role: CrateRole) => {
    switch (role) {
      case CrateRole.Owner:
        return "bg-red-100 text-red-700 hover:bg-red-200";
      case CrateRole.Editor:
        return "bg-green-100 text-green-700 hover:bg-green-200";
      case CrateRole.Viewer:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-semibold text-left">Share this crate</DialogTitle>
          <button onClick={onClose} className="absolute right-0 top-0 p-1 hover:bg-gray-100 rounded-full">
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 mt-2">
            <Info className="h-4 w-4 text-gray-500" />
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">Invite your team to collaborate on this crate.</p>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Add team member"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 pr-10"
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchValue.trim()) {
                  handleInvite();
                }
              }}
            />
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {/* People with access */}
          <div>
            <h3 className="font-medium text-sm mb-3">People with access</h3>
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
                      {member.role === CrateRole.Owner && (
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border border-white" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{member.displayName}</p>
                      <p className="text-xs text-gray-500 truncate">{member.email}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className={`${getRoleColor(member.role)} border-0`}>
                        {member.role}
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {Object.values(CrateRole).map((role) => (
                        <DropdownMenuItem
                          key={role}
                          onClick={() => handleRoleChange(member.userId, role)}
                          className={member.role === role ? "bg-gray-100" : ""}
                        >
                          {role}
                        </DropdownMenuItem>
                      ))}
                      {member.role !== CrateRole.Owner && (
                        <>
                          <hr className="my-1" />
                          <DropdownMenuItem
                            onClick={() => handleRemoveMember(member.userId)}
                            className="text-red-600 focus:text-red-600"
                          >
                            Remove access
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
