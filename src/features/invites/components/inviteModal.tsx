import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { CrateRole } from "@/features/crates/crateTypes";
import { useAssignRole, useRemoveMember } from "@/features/members/api/memberQueries";
import MembersList from "@/features/members/components/MemberList";
import InviteForm from "./InviteForm";
import { usePaginatedMembersModal } from "@/features/members/hooks/usePaginatedMembersModal";
import { SearchInput } from "@/shared/components/search/SearchInput";
import PaginationControls from "@/shared/components/pagination/PaginationControls";
import { Separator } from "@/shared/components/ui/separator";

type InviteModalProps = {
  currentUserRole: CrateRole;
  isOpen: boolean;
  crateId: string;
  onClose: () => void;
};

function InviteModal({ currentUserRole, isOpen, onClose, crateId }: InviteModalProps) {
  const {
    data: paginatedResult,
    isLoading,
    page,
    pageSize,
    searchTerm,
    setPage,
    handleSearch,
    resetPagination,
  } = usePaginatedMembersModal(crateId, 1);

  const assignRoleMutation = useAssignRole(crateId);
  const removeMemberMutation = useRemoveMember(crateId);
  const members = paginatedResult?.items || [];

  const canManageMembers = currentUserRole === CrateRole.Owner || currentUserRole === CrateRole.Manager;

  const handleRoleChange = async (userId: string, newRole: CrateRole) => {
    if (!canManageMembers) return;
    
    try {
      await assignRoleMutation.mutateAsync({ userId, role: newRole });
    } catch (error) {}
  };

  const handleRemoveMember = async (userId: string) => {
    if (!canManageMembers) return; 
    
    try {
      await removeMemberMutation.mutateAsync(userId);
    } catch (error) {}
  };

  const handleModalChange = (open: boolean) => {
    if (!open) {
      onClose();
    } else {
      resetPagination();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalChange}>
      <DialogContent className="min-w-2xl mx-auto text-foreground border-muted">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-left">
            {canManageMembers ? "Manage Crate Members" : "Crate Members"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {canManageMembers ? (
            <>
              <p className="text-sm text-muted-foreground">
                Invite your team to collaborate on this crate.
              </p>
              <InviteForm crateId={crateId} />
              <Separator />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              View members of this crate.
            </p>
          )}
          
          <SearchInput 
            placeholder="Search members..." 
            value={searchTerm} 
            onChange={handleSearch} 
            delay={300} 
          />
          
          <MembersList
            members={members}
            onRoleChange={handleRoleChange}
            onRemoveMember={handleRemoveMember}
            isLoading={assignRoleMutation.isPending || removeMemberMutation.isPending || isLoading}
            currentUserRole={currentUserRole}
          />
          
          {paginatedResult && (
            <PaginationControls
              align="left"
              page={page}
              pageSize={pageSize}
              totalCount={paginatedResult.totalCount}
              onPageChange={setPage}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InviteModal;