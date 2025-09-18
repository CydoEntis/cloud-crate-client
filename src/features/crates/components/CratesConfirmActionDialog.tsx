import ConfirmDialog from "@/shared/components/ConfirmDialog";
import type { CrateSummary } from "@/features/crates/crateTypes";

type ConfirmAction = {
  type: "delete" | "leave";
  crate: CrateSummary;
};

type CratesConfirmDialogProps = {
  confirmAction: ConfirmAction | null;
  isDeleting: boolean;
  isLeaving: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

function CratesConfirmActionDialog({
  confirmAction,
  isDeleting,
  isLeaving,
  onConfirm,
  onCancel,
}: CratesConfirmDialogProps) {
  if (!confirmAction) return null;

  return (
    <ConfirmDialog
      open={true}
      title={confirmAction.type === "delete" ? "Delete Crate" : "Leave Crate"}
      description={
        confirmAction.type === "delete"
          ? `Are you sure you want to delete "${confirmAction.crate.name}"? This action cannot be undone.`
          : `Are you sure you want to leave "${confirmAction.crate.name}"?`
      }
      confirmLabel={
        confirmAction.type === "delete" ? (isDeleting ? "Deleting..." : "Delete") : isLeaving ? "Leaving..." : "Leave"
      }
      cancelLabel="Cancel"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

export default CratesConfirmActionDialog;
