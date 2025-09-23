import { AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface BanDialogProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
}

export function BanDialog({ open, message, onConfirm }: BanDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md border-muted text-foreground">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <AlertDialogTitle>Account Suspended</AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="text-left mt-4">
            {message || "Your account has been suspended by an administrator. You will be logged out."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onConfirm} className="w-full cursor-pointer">
            I Understand
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
