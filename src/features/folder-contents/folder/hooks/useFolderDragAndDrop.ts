import type { QueryObserverResult } from "@tanstack/react-query";
import { useCallback } from "react";
import { useMoveFolder } from "../api/folderQueries";
import type { FolderContents } from "../../sharedTypes";
import { useMoveFile } from "../../file/api/fileQueries";

export function useFolderDragAndDrop(crateId: string) {
  const moveFolderMutation = useMoveFolder();
  const moveFileMutation = useMoveFile();

  const handleDropItem = useCallback(
    async (
      item: { id: string; isFolder: boolean },
      targetFolderId: string | null,
      refetch?: () => Promise<QueryObserverResult<FolderContents>>
    ) => {
      if (item.isFolder) {
        await moveFolderMutation.mutateAsync({
          crateId,
          folderId: item.id,
          moveData: { newParentId: targetFolderId },
        });
      } else {
        await moveFileMutation.mutateAsync({
          crateId,
          fileId: item.id,
          moveData: { newParentId: targetFolderId },
        });
      }
      if (refetch) await refetch();
    },
    [crateId, moveFolderMutation, moveFileMutation]
  );

  return {
    handleDropItem,
    isMoving: moveFolderMutation.isPending || moveFileMutation.isPending,
  };
}
