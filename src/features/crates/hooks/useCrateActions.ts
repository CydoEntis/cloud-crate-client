import { useState, useCallback } from "react";
import { useDeleteCrate, useLeaveCrate } from "@/features/crates/api/crate.queries";
import type { Crate } from "@/features/crates/crate.types";

type ConfirmAction = {
  type: "delete" | "leave";
  crate: Crate;
};

export function useCrateActions(crates?: Crate[]) {
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const deleteCrateMutation = useDeleteCrate();
  const leaveCrateMutation = useLeaveCrate();

  const handleDeleteCrate = useCallback(
    (crateId: string) => {
      const crate = crates?.find((c) => c.id === crateId);
      if (crate) {
        setConfirmAction({ type: "delete", crate });
      }
    },
    [crates]
  );

  const handleLeaveCrate = useCallback(
    (crateId: string) => {
      const crate = crates?.find((c) => c.id === crateId);
      if (crate) {
        setConfirmAction({ type: "leave", crate });
      }
    },
    [crates]
  );

  const handleConfirmAction = useCallback(async () => {
    if (!confirmAction) return;

    const { type, crate } = confirmAction;

    try {
      if (type === "delete") {
        await deleteCrateMutation.mutateAsync(crate.id);
      } else {
        await leaveCrateMutation.mutateAsync(crate.id);
      }
    } finally {
      setConfirmAction(null);
    }
  }, [confirmAction, deleteCrateMutation, leaveCrateMutation]);

  const handleCancelAction = useCallback(() => {
    setConfirmAction(null);
  }, []);

  return {
    confirmAction,
    handleDeleteCrate,
    handleLeaveCrate,
    handleConfirmAction,
    handleCancelAction,
    isDeleting: deleteCrateMutation.isPending,
    isLeaving: leaveCrateMutation.isPending,
  };
}
