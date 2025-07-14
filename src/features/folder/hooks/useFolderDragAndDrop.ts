import { useCallback } from "react";
import { useMoveFolder } from "./mutations/useMoveFolderMutation";
import { useMoveFile } from "@/features/files/hooks/useMoveFile";
import { type DragItemType } from "../types";

export function useFolderDragAndDrop(crateId: string) {
  const moveFolderMutation = useMoveFolder();
  const moveFileMutation = useMoveFile();

  const handleDropItem = useCallback(
    async (itemId: string, itemType: DragItemType, targetFolderId: string | null, refetch: () => Promise<void>) => {
      if (itemType === "Folder") {
        await moveFolderMutation.mutateAsync({
          crateId,
          folderId: itemId,
          newParentId: targetFolderId,
        });
      } else if (itemType === "File") {
        await moveFileMutation.mutateAsync({
          crateId,
          fileId: itemId,
          newParentId: targetFolderId,
        });
      }
      await refetch();
    },
    [crateId, moveFolderMutation, moveFileMutation]
  );

  return {
    handleDropItem,
    isMoving: moveFolderMutation.isPending || moveFileMutation.isPending,
  };
}
