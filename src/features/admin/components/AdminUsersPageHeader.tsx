import { useState } from "react";
import { Users, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import AdminInviteUserModal from "./AdminInviteUserModal";

function AdminUsersPageHeader() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between text-foreground">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>
        <Button onClick={() => setShowInviteModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      <AdminInviteUserModal open={showInviteModal} onClose={() => setShowInviteModal(false)} />
    </>
  );
}

export default AdminUsersPageHeader;
