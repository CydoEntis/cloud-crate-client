import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UpdateCrateForm from "./UpdateCrateForm";

type UpdateCrateModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  crateId: string;
  initialName: string;
  initialColor: string;
};

function UpdateCrateModal({ open, onOpenChange, crateId, initialName, initialColor }: UpdateCrateModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="mt-10 max-w-lg text-foreground bg-card border-none" 
        onClick={(e) => e.stopPropagation()}
        style={{ top: "25%", transform: "translate(0, 0)" }} 
      >
        <DialogHeader>
          <DialogTitle>Edit Crate</DialogTitle>
        </DialogHeader>
        <UpdateCrateForm
          crateId={crateId}
          initialName={initialName}
          initialColor={initialColor}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCrateModal;
