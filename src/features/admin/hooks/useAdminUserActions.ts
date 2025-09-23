import { useState, useCallback } from "react";
import {
  useBanUser,
  useUnbanUser,
  useDeleteUser,
  useMakeAdmin,
  useRemoveAdmin,
  useUpdateUserPlan,
} from "../api/adminQueries";
import type { AdminUser, SubscriptionPlan } from "../adminTypes";

type ConfirmAction = {
  type: "ban" | "delete" | "makeAdmin" | "removeAdmin";
  userId: string;
  userEmail: string;
} | null;

export const useAdminUserActions = (users: AdminUser[]) => {
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const banMutation = useBanUser();
  const unbanMutation = useUnbanUser();
  const deleteMutation = useDeleteUser();
  const makeAdminMutation = useMakeAdmin();
  const removeAdminMutation = useRemoveAdmin();
  const updatePlanMutation = useUpdateUserPlan();

  const handleBanUser = useCallback(
    (userId: string) => {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setConfirmAction({
          type: "ban",
          userId,
          userEmail: user.email,
        });
      }
    },
    [users]
  );

  const handleUnbanUser = useCallback(
    (userId: string) => {
      unbanMutation.mutate(userId);
    },
    [unbanMutation]
  );

  const handleDeleteUser = useCallback(
    (userId: string) => {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setConfirmAction({
          type: "delete",
          userId,
          userEmail: user.email,
        });
      }
    },
    [users]
  );

  const handleMakeAdmin = useCallback(
    (userId: string) => {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setConfirmAction({
          type: "makeAdmin",
          userId,
          userEmail: user.email,
        });
      }
    },
    [users]
  );

  const handleRemoveAdmin = useCallback(
    (userId: string) => {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setConfirmAction({
          type: "removeAdmin",
          userId,
          userEmail: user.email,
        });
      }
    },
    [users]
  );

  const handleUpdatePlan = useCallback(
    (userId: string, plan: SubscriptionPlan) => {
      updatePlanMutation.mutate({ userId, plan });
    },
    [updatePlanMutation]
  );

  const handleConfirmAction = useCallback(() => {
    if (!confirmAction) return;

    switch (confirmAction.type) {
      case "ban":
        banMutation.mutate(confirmAction.userId);
        break;
      case "delete":
        deleteMutation.mutate(confirmAction.userId);
        break;
      case "makeAdmin":
        makeAdminMutation.mutate(confirmAction.userId);
        break;
      case "removeAdmin":
        removeAdminMutation.mutate(confirmAction.userId);
        break;
    }
    setConfirmAction(null);
  }, [confirmAction, banMutation, deleteMutation, makeAdminMutation, removeAdminMutation]);

  const handleCancelAction = useCallback(() => {
    setConfirmAction(null);
  }, []);

  return {
    confirmAction,
    handleBanUser,
    handleUnbanUser,
    handleDeleteUser,
    handleMakeAdmin,
    handleRemoveAdmin,
    handleUpdatePlan,
    handleConfirmAction,
    handleCancelAction,
    isBanning: banMutation.isPending,
    isUnbanning: unbanMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isMakingAdmin: makeAdminMutation.isPending,
    isRemovingAdmin: removeAdminMutation.isPending,
  };
};
