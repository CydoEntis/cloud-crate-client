import { useState } from "react";
import { Pencil, UserPlus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { useCrateDetails } from "@/features/crates/api/crateQueries";
import { CrateRole } from "@/features/crates/crateTypes";
import { useParams } from "@tanstack/react-router";
import { useCrateModalStore } from "@/features/crates/store/crateModalStore";
import { useMemberPreview } from "@/features/members/api/memberQueries";
import InviteModal from "@/features/invites/components/InviteModal";

function FolderContentsPageHeader() {
  const { crateId } = useParams({ from: "/(protected)/crates/$crateId/folders/$folderId" });
  const { data: members } = useMemberPreview(crateId);
  const { data: crate } = useCrateDetails(crateId);
  const { open } = useCrateModalStore();

  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  const canManage = crate?.currentMember.role !== CrateRole.Viewer;
  const remainingCount = members ? Math.max(0, members.totalCount - members.items.length) : 0;

  const handleInvite = () => {
    setInviteModalOpen(true);
  };

  if (!crate) return null;

  return (
    <>
      <div className="flex justify-between items-center py-2">
        <h1 className="text-3xl font-bold text-foreground">{crate.name}</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
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
            </div>

            {canManage && (
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary/20 hover:text-primary"
                onClick={handleInvite}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite
              </Button>
            )}
          </div>

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
        </div>
      </div>

      <InviteModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        crateId={crateId}
      />
    </>
  );
}

export default FolderContentsPageHeader;
