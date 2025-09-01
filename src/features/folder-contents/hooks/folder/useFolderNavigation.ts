import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { navigateToFolder } from "../../utils/folder/navigateToFolder";

export function useFolderNavigation(crateId: string) {
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (toFolderId: string | null) => {
      navigateToFolder(navigate, crateId, toFolderId);
    },
    [navigate, crateId]
  );

  return { handleNavigate };
}
