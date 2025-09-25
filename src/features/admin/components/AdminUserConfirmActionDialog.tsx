import ConfirmDialog from "@/shared/components/dialogs/ConfirmDialog";

type ConfirmAction = {
  type: "ban" | "unban" | "delete" | "makeAdmin" | "removeAdmin";
  userId: string;
  userEmail: string;
} | null;

type AdminUserConfirmDialogProps = {
  confirmAction: ConfirmAction;
  isBanning: boolean;
  isUnbanning: boolean;
  isMakingAdmin: boolean;
  isRemovingAdmin: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

function AdminUserConfirmActionDialog({
  confirmAction,
  isBanning,
  isUnbanning,
  isMakingAdmin,
  isRemovingAdmin,
  onConfirm,
  onCancel,
}: AdminUserConfirmDialogProps) {
  if (!confirmAction) return null;

  const getTitle = () => {
    switch (confirmAction.type) {
      case "ban":
        return "Ban User";
      case "delete":
        return "Delete User";
      case "makeAdmin":
        return "Promote to Admin";
      case "removeAdmin":
        return "Remove Admin";
      default:
        return "";
    }
  };

  const getDescription = () => {
    switch (confirmAction.type) {
      case "ban":
        return `Are you sure you want to ban "${confirmAction.userEmail}"? They will no longer be able to access the system.`;
      case "delete":
        return `Are you sure you want to delete "${confirmAction.userEmail}"? This action cannot be undone and will permanently remove all user data.`;
      case "makeAdmin":
        return `Are you sure you want to promote "${confirmAction.userEmail}" to admin? They will have full administrative privileges.`;
      case "removeAdmin":
        return `Are you sure you want to remove admin privileges from "${confirmAction.userEmail}"?`;
      default:
        return "";
    }
  };

  const getConfirmLabel = () => {
    switch (confirmAction.type) {
      case "ban":
        return isBanning ? "Banning..." : "Ban User";
      case "makeAdmin":
        return isMakingAdmin ? "Promoting..." : "Promote";
      case "removeAdmin":
        return isRemovingAdmin ? "Removing..." : "Remove Admin";
      default:
        return "Confirm";
    }
  };

  return (
    <ConfirmDialog
      open={true}
      title={getTitle()}
      description={getDescription()}
      confirmLabel={getConfirmLabel()}
      cancelLabel="Cancel"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

export default AdminUserConfirmActionDialog;
