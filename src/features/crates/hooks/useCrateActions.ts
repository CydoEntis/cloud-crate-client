import { useState } from "react";
import { useDeleteCrate, useLeaveCrate } from "../api/crateQueries";
import type { CrateSummary } from "../crateTypes";

type ConfirmAction = {
  type: "delete" | "leave";
  crate: CrateSummary;
} | null;

export function useCrateActions(crates: CrateSummary[]) {
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const { mutateAsync: deleteCrate, isPending: isDeleting } = useDeleteCrate();
  const { mutateAsync: leaveCrate, isPending: isLeaving } = useLeaveCrate();

  const handleDeleteCrate = (crate: CrateSummary) => {
    setConfirmAction({ type: "delete", crate });
  };

  const handleLeaveCrate = (crate: CrateSummary) => {
    setConfirmAction({ type: "leave", crate });
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;

    try {
      if (confirmAction.type === "delete") {
        await deleteCrate(confirmAction.crate.id);
      } else {
        await leaveCrate(confirmAction.crate.id);
      }
      setConfirmAction(null);
    } catch (error) {
      console.error("Action failed:", error);
    }
  };

  const handleCancelAction = () => {
    setConfirmAction(null);
  };

  return {
    confirmAction,
    handleDeleteCrate,
    handleLeaveCrate,
    handleConfirmAction,
    handleCancelAction,
    isDeleting,
    isLeaving,
  };
}
