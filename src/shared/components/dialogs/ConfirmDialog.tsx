import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean; 
};

function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false, 
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent
        className="text-foreground border-muted"
        aria-describedby={description ? "confirm-dialog-description" : undefined}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription id="confirm-dialog-description">{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="mt-4 flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
            disabled={isLoading} 
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} 
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;