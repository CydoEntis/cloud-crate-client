import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { CrateRole } from "@/features/crates/crateTypes";
import { usePaginatedMembers, useAssignRole, useRemoveMember } from "@/features/members/api/memberQueries";
import MembersList from "@/features/members/components/MemberList";
import InviteForm from "./InviteForm";

type InviteModalProps = {
  currentUserRole: CrateRole;
  isOpen: boolean;
  crateId: string;
  onClose: () => void;
};

function InviteModal({ currentUserRole, isOpen, onClose, crateId }: InviteModalProps) {
  const { data: paginatedResult, isLoading, error } = usePaginatedMembers(crateId);
  const assignRoleMutation = useAssignRole(crateId);
  const removeMemberMutation = useRemoveMember(crateId);

  const members = paginatedResult?.items || [];

  const handleRoleChange = async (userId: string, newRole: CrateRole) => {
    try {
      await assignRoleMutation.mutateAsync({ userId, role: newRole });
    } catch (error) {}
  };

  const handleRemoveMember = async (userId: string) => {
    try {
      await removeMemberMutation.mutateAsync(userId);
    } catch (error) {}
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl mx-auto text-foreground border-muted">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-left">Invite to crate</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mb-4">
          <p className="text-sm text-muted-foreground">Invite your team to collaborate on this crate.</p>

          <InviteForm crateId={crateId} />

          <MembersList
            members={members}
            onRoleChange={handleRoleChange}
            onRemoveMember={handleRemoveMember}
            isLoading={assignRoleMutation.isPending || removeMemberMutation.isPending}
            currentUserRole={currentUserRole}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteModal;
