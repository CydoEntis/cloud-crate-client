
import { useState } from "react";
import { Users, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import AdminInviteUserModal from "./AdminInviteUserModal";

function AdminUsersPageHeader() {
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 text-foreground lg:grid-cols-2 lg:gap-0 lg:items-center">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={() => setShowInviteModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Invite User
          </Button>
        </div>
      </div>

      <AdminInviteUserModal open={showInviteModal} onClose={() => setShowInviteModal(false)} />
    </>
  );
}

export default AdminUsersPageHeader;