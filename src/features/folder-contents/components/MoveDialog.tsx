import { useState, useCallback, useEffect, useMemo } from "react";
import { Folder, File, Home, ArrowUpAZ, ArrowDownAZ } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { SearchInput } from "@/shared/components/search/SearchInput";
import PaginationControls from "@/shared/components/pagination/PaginationControls";
import { useGetAvailableMoveTargets } from "../folder/api/folderQueries";
import { useMoveFile } from "../file/api/fileQueries";
import { useMoveFolder } from "../folder/api/folderQueries";
import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import { folderService } from "@/features/folder-contents/folder/api/folderService";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { SHARED_KEYS } from "@/features/shared/queryKeys";
import type { FolderContentRowItem } from "../sharedTypes";

interface MoveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: FolderContentRowItem | null;
  currentFolderId?: string | null;
  crateId: string;
  isBulkOperation?: boolean;
  onSuccess?: () => void;
}

function MoveDialog({
  isOpen,
  onClose,
  item,
  currentFolderId,
  crateId,
  isBulkOperation = false,
  onSuccess,
}: MoveDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [ascending, setAscending] = useState(true);
  const [isMovingBulk, setIsMovingBulk] = useState(false);

  const queryClient = useQueryClient();
  const { getFinalMoveSelection, clearSelection, folderIds } = useSelectionStore();

  const excludeFolderIds = useMemo(() => {
    if (isBulkOperation) {
      return Array.from(folderIds);
    }
    return item?.isFolder ? [item.id] : [];
  }, [isBulkOperation, folderIds, item]);

  const { data: paginatedResult, isLoading } = useGetAvailableMoveTargets({
    crateId,
    excludeFolderIds,
    searchTerm,
    page,
    pageSize: 20,
    ascending,
    currentFolderId,
  });

  const moveFileMutation = useMoveFile();
  const moveFolderMutation = useMoveFolder();

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setPage(1);
      setAscending(true);
    }
  }, [isOpen]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const getEmptyStateMessage = useMemo(() => {
    if (isLoading) return null;

    if (!paginatedResult || paginatedResult.totalCount === 0) {
      if (isBulkOperation) {
        const { fileIds, folderIds } = getFinalMoveSelection();

        if (folderIds.length > 0) {
          return {
            title: "Can't move these folders",
            message:
              folderIds.length === 1
                ? "You can't move a folder into itself or into one of its own subfolders."
                : "Some of the selected folders can't be moved because you've selected both parent and child folders, or all the available folders.",
            suggestion: "Try selecting fewer folders at once, or move them one at a time.",
          };
        }

        return {
          title: "No folders available",
          message: "This crate doesn't have any folders to move your files into.",
          suggestion: "Create a folder first, then try moving your files.",
        };
      } else {
        if (item?.isFolder) {
          return {
            title: "Can't move this folder",
            message: `"${item.name}" can't be moved because you can't put a folder inside itself or inside one of its own subfolders.`,
            suggestion: "You can only move folders into other separate folders or back to the main area.",
          };
        } else {
          return {
            title: "No folders available",
            message: "This crate doesn't have any folders to move this file into.",
            suggestion: "Create a folder first, then try moving the file.",
          };
        }
      }
    }

    return null;
  }, [isLoading, paginatedResult, isBulkOperation, getFinalMoveSelection, item]);

  const canMoveToRoot = useMemo(() => {
    if (!currentFolderId) return false;

    if (isBulkOperation) {
      const { folderIds } = getFinalMoveSelection();
      return folderIds.length === 0;
    }

    return true;
  }, [currentFolderId, isBulkOperation, getFinalMoveSelection]);

  const invalidateRelevantCaches = useCallback(
    (targetFolderId: string | null) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return Array.isArray(queryKey) && queryKey.includes("folder-contents") && queryKey.includes(crateId);
        },
      });

      if (currentFolderId !== undefined) {
        queryClient.invalidateQueries({
          queryKey: SHARED_KEYS.folderContents(crateId, currentFolderId),
        });
      }
      if (targetFolderId) {
        queryClient.invalidateQueries({
          queryKey: SHARED_KEYS.folderContents(crateId, targetFolderId),
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: SHARED_KEYS.folderContents(crateId, null),
        });
      }

      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
    },
    [queryClient, crateId, currentFolderId]
  );

  const handleMoveToFolder = useCallback(
    async (targetFolderId: string | null) => {
      if (isBulkOperation) {
        setIsMovingBulk(true);
        try {
          const { fileIds, folderIds: selectedFolderIds } = getFinalMoveSelection();

          if (targetFolderId && selectedFolderIds.includes(targetFolderId)) {
            toast.error("Cannot move a folder into itself");
            return;
          }

          await folderService.bulkMoveItems(crateId, fileIds, selectedFolderIds, targetFolderId);

          invalidateRelevantCaches(targetFolderId);

          clearSelection();
          onSuccess?.();
          toast.success("Items moved successfully");
          onClose();
        } catch (error) {
          console.error("Bulk move failed:", error);
          toast.error("Failed to move items");
        } finally {
          setIsMovingBulk(false);
        }
      } else {
        if (!item) return;
        try {
          if (item.isFolder) {
            await moveFolderMutation.mutateAsync({
              crateId,
              folderId: item.id,
              moveData: {
                newParentId: targetFolderId,
              },
            });
          } else {
            await moveFileMutation.mutateAsync({
              crateId,
              fileId: item.id,
              moveData: { newParentId: targetFolderId },
            });
          }

          invalidateRelevantCaches(targetFolderId);

          onSuccess?.();
          onClose();
        } catch (error) {
          console.error("Move failed:", error);
        }
      }
    },
    [
      item,
      crateId,
      moveFileMutation,
      moveFolderMutation,
      onClose,
      isBulkOperation,
      getFinalMoveSelection,
      clearSelection,
      onSuccess,
      currentFolderId,
      invalidateRelevantCaches,
    ]
  );

  const isMoving = moveFileMutation.isPending || moveFolderMutation.isPending || isMovingBulk;

  if (!isBulkOperation && !item) return null;

  const folders = paginatedResult?.items || [];
  const totalCount = paginatedResult?.totalCount || 0;

  const getDialogTitle = () => {
    if (isBulkOperation) {
      const { fileIds, folderIds } = getFinalMoveSelection();
      const totalSelected = fileIds.length + folderIds.length;
      return `Move ${totalSelected} selected item${totalSelected !== 1 ? "s" : ""}`;
    }
    return `Move "${item?.name}"`;
  };

  const getDialogIcon = () => {
    if (isBulkOperation) {
      return <Folder size={20} />;
    }
    return item?.isFolder ? <Folder size={20} /> : <File size={20} />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getDialogIcon()}
            {getDialogTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 flex-1 min-h-0">
          <div className="flex gap-3">
            <div className="flex-1">
              <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search folders..." />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAscending(!ascending)}
              title={ascending ? "Sort Z to A" : "Sort A to Z"}
            >
              {ascending ? <ArrowUpAZ size={16} /> : <ArrowDownAZ size={16} />}
            </Button>
          </div>

          <div className="flex-1 min-h-0 rounded-md">
            <div className="max-h-[400px] overflow-y-auto">
              {getEmptyStateMessage ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Folder size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{getEmptyStateMessage.title}</h3>
                  <p className="text-muted-foreground mb-3 max-w-md">{getEmptyStateMessage.message}</p>
                  <p className="text-sm text-primary bg-primary/10 rounded-md px-3 py-2 max-w-md">
                    💡 {getEmptyStateMessage.suggestion}
                  </p>
                </div>
              ) : (
                <>
                  {folders.map((folder) => (
                    <div key={folder.id} className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Folder size={16} className="text-primary" />
                        <span className="font-medium truncate">{folder.name}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMoveToFolder(folder.id)}
                        disabled={isLoading || isMoving}
                      >
                        {isMoving ? "Moving..." : "Move To"}
                      </Button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {totalCount > 0 && (
          <DialogFooter>
            <PaginationControls
              page={page}
              pageSize={20}
              totalCount={totalCount}
              onPageChange={setPage}
              align="center"
            />
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default MoveDialog;
