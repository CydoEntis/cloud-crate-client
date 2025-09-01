import { useCallback } from "react";
import { useMoveFolder } from "./mutations/useMoveFolder";
import { useMoveFile } from "@/features/folder-contents/hooks/file/mutations/useMoveFile";
import type { QueryObserverResult } from "@tanstack/react-query";
import type { FolderContents } from "../../types/FolderContents";
import type { FolderContentRowItem } from "../../types/FolderContentRowItem";

export function useFolderDragAndDrop(crateId: string) {
  const moveFolderMutation = useMoveFolder();
  const moveFileMutation = useMoveFile();

  const handleDropItem = useCallback(
    async (
      item: { id: string; isFolder: boolean },
      targetFolderId: string | null,
      refetch: () => Promise<QueryObserverResult<FolderContents>>
    ) => {
      if (item.isFolder) {
        await moveFolderMutation.mutateAsync({
          crateId,
          folderId: item.id,
          newParentId: targetFolderId,
        });
      } else {
        await moveFileMutation.mutateAsync({
          crateId,
          fileId: item.id,
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
