// InviteModal.tsx (simplified)
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { CrateRole } from "@/features/crates/crateTypes";
import { usePaginatedMembers } from "@/features/members/api/memberQueries";
import MembersList from "@/features/members/components/MemberList";
import InviteForm from "./InviteForm";

type InviteModalProps = {
  isOpen: boolean;
  crateId: string;
  onClose: () => void;
};

function InviteModal({ isOpen, onClose, crateId }: InviteModalProps) {
  const { data: paginatedResult, isLoading, error } = usePaginatedMembers(crateId);
  const members = paginatedResult?.items || [];

  const handleRoleChange = (userId: string, newRole: CrateRole) => {
    console.log(`Change ${userId} role to ${newRole}`);
  };

  const handleRemoveMember = (userId: string) => {
    console.log(`Remove member ${userId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className="min-w-2xl mx-auto text-foreground border-muted">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-left">Invite to crate</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mb-4">
          <p className="text-sm text-muted-foreground">Invite your team to collaborate on this crate.</p>

          <InviteForm crateId={crateId} />

          <MembersList members={members} onRoleChange={handleRoleChange} onRemoveMember={handleRemoveMember} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteModal;
