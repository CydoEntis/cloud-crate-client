import { useState } from "react";
import { useDeleteCrate } from "../hooks/mutations/useDeleteCrate";
import { toast } from "sonner";
import { Loader2, Check } from "lucide-react";
import { useAnimatedAction } from "@/shared/hooks/useAnimationAction";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/shared/components/ui/button";

export default function DeleteCrate({ crateId }: { crateId: string }) {
  const navigate = useNavigate();
  const { mutateAsync: deleteCrate } = useDeleteCrate();
  const { phase, run } = useAnimatedAction();

  const [confirming, setConfirming] = useState(false);

  const startConfirm = () => setConfirming(true);
  const cancelConfirm = () => setConfirming(false);

  const handleConfirm = async () => {
    try {
      await run(() => deleteCrate(crateId));
      toast.success("Crate deleted.");
      setConfirming(false);
      navigate({ to: "/" });
    } catch {
      toast.error("Failed to delete crate.");
    }
  };

  return (
    <div>
      <h4 className="text-sm font-semibold text-destructive mb-1">Delete Crate</h4>
      <p className="text-xs text-muted-foreground mb-2">
        Deleting this crate will permanently remove all its contents.
      </p>

      {!confirming ? (
        <Button
          variant="outline"
          className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
          onClick={startConfirm}
          disabled={phase !== "idle"}
        >
          Delete Crate
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button variant="destructive" className="flex-1" onClick={handleConfirm} disabled={phase !== "idle"}>
            {phase === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : phase === "success" ? (
              <div className="flex items-center gap-1 justify-center">
                <Check className="h-6 w-6 text-white" />
                <span>Deleted</span>
              </div>
            ) : (
              "Confirm"
            )}
          </Button>
          <Button variant="outline" className="flex-1" onClick={cancelConfirm} disabled={phase !== "idle"}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
