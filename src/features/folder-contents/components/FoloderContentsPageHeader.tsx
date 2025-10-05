import { useState } from "react";
import { Pencil, UserPlus, Users, X, Settings } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useCrateDetails, useDeleteCrate } from "@/features/crates/api/crateQueries";
import { CrateRole } from "@/features/crates/crateTypes";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useCrateModalStore } from "@/features/crates/store/crateModalStore";
import { useLeaveCrate, useMemberPreview } from "@/features/members/api/memberQueries";
import InviteModal from "@/features/invites/components/inviteModal";

function FolderContentsPageHeader() {
  const { crateId } = useParams({ from: "/(protected)/crates/$crateId/folders/$folderId" });
  const { data: members } = useMemberPreview(crateId);
  const { data: crate } = useCrateDetails(crateId);
  const { open } = useCrateModalStore();
  const leaveCrate = useLeaveCrate();
  const navigate = useNavigate();

  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  if (!crate) return null;

  const canManage = crate.currentMember.role === CrateRole.Owner || crate.currentMember.role === CrateRole.Manager;
  const canLeave = crate.currentMember.role !== CrateRole.Owner;
  const isOwner = crate.currentMember.role === CrateRole.Owner;

  const remainingCount = members ? Math.max(0, members.totalCount - members.items.length) : 0;

  const handleMembersClick = () => {
    setInviteModalOpen(true);
  };

  const handleLeaveCrate = async () => {
    if (!crate.currentMember) return;
    await leaveCrate.mutateAsync({
      crateId,
      userId: crate.currentMember.userId,
    });
    navigate({ to: "/crates" });
  };

  const deleteCrate = useDeleteCrate();

  const handleDeleteCrate = async () => {
    if (!crate?.id) return;
    await deleteCrate.mutateAsync(crate.id);
    navigate({ to: "/crates" });
  };

  const renderMemberAvatars = () => (
    <>
      {members?.items.slice(0, 4).map((member) => (
        <Avatar key={member.userId} className="h-8 w-8 border-2 border-background">
          <AvatarImage src={member.profilePicture} alt={member.displayName} />
          <AvatarFallback className="text-xs">{member.displayName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
          <span className="text-xs font-medium text-muted-foreground">+{remainingCount}</span>
        </div>
      )}
    </>
  );

  const renderDesktopButtons = () => (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">{renderMemberAvatars()}</div>
      <Button
        variant="outline"
        size="sm"
        className="border-primary text-primary hover:bg-primary/20 hover:text-primary"
        onClick={handleMembersClick}
      >
        {canManage ? (
          <>
            <UserPlus className="h-4 w-4 mr-2" />
            Invite
          </>
        ) : (
          <>
            <Users className="h-4 w-4 mr-2" />
            Members
          </>
        )}
      </Button>
      {canManage && (
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary/30 cursor-pointer hover:text-primary"
          onClick={() => open(crate.id)}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
      )}
      {canLeave && (
        <Button
          variant="outline"
          className="!border-destructive text-destructive hover:!bg-destructive/30 cursor-pointer hover:!text-destructive"
          onClick={handleLeaveCrate}
        >
          <X className="h-4 w-4 mr-2" />
          Leave
        </Button>
      )}
      {isOwner && (
        <Button
          variant="outline"
          className="!border-destructive text-destructive hover:!bg-destructive/30 cursor-pointer hover:!text-destructive"
          onClick={handleDeleteCrate}
        >
          <X className="h-4 w-4 mr-2" />
          Delete
        </Button>
      )}
    </div>
  );

  return (
    <>
      <div className="hidden xl:flex justify-between items-center py-2">
        <h1 className="text-3xl font-bold text-foreground">{crate.name}</h1>
        {renderDesktopButtons()}
      </div>

      <div className="hidden md:flex xl:hidden flex-col gap-3 py-2">
        <h1 className="text-3xl font-bold text-foreground">{crate.name}</h1>
        <div className="flex items-center justify-between gap-2">{renderDesktopButtons()}</div>
      </div>

      <div className="flex md:hidden justify-between items-center py-2">
        <h1 className="text-2xl font-bold text-foreground">{crate.name}</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleMembersClick}>
              {canManage ? (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Members
                </>
              ) : (
                <>
                  <Users className="h-4 w-4 mr-2" />
                  View Members
                </>
              )}
            </DropdownMenuItem>
            {canManage && (
              <DropdownMenuItem onClick={() => open(crate.id)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit Crate
              </DropdownMenuItem>
            )}
            {canLeave && (
              <DropdownMenuItem onClick={handleLeaveCrate} className="text-destructive">
                <X className="h-4 w-4 mr-2" />
                Leave Crate
              </DropdownMenuItem>
            )}
            {isOwner && (
              <DropdownMenuItem onClick={handleDeleteCrate} className="text-destructive">
                <X className="h-4 w-4 mr-2" />
                Delete Crate
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <InviteModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        crateId={crateId}
        currentUserRole={crate.currentMember.role}
      />
    </>
  );
}

export default FolderContentsPageHeader;
