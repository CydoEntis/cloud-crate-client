import { useState, useCallback, useEffect } from "react";
import { Folder, File, Home, ArrowUpAZ, ArrowDownAZ } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { SearchInput } from "@/shared/components/search/SearchInput";
import PaginationControls from "@/shared/components/pagination/PaginationControls";
import { useGetAvailableMoveTargets } from "../folder/api/folderQueries";
import { useMoveFile } from "../file/api/fileQueries";
import { useMoveFolder } from "../folder/api/folderQueries";
import type { FolderContentRowItem } from "../sharedTypes";

interface MoveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: FolderContentRowItem | null;
  currentFolderId?: string | null;
  crateId: string;
}

function MoveDialog({ isOpen, onClose, item, currentFolderId, crateId }: MoveDialogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [ascending, setAscending] = useState(true);

  const excludeFolderId = item?.isFolder ? item.id : undefined;

  const { data: paginatedResult, isLoading } = useGetAvailableMoveTargets({
    crateId,
    excludeFolderId,
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

  const handleMoveToFolder = useCallback(
    async (targetFolderId: string | null) => {
      if (!item) return;
      try {
        if (item.isFolder) {
          await moveFolderMutation.mutateAsync({
            crateId,
            folderId: item.id,
            moveData: {
              folderId: item.id,
              newParentId: targetFolderId, // ✅ Fixed property name
            },
          });
        } else {
          await moveFileMutation.mutateAsync({
            crateId,
            fileId: item.id,
            moveData: { newParentId: targetFolderId },
          });
        }
        onClose();
      } catch (error) {
        console.error("Move failed:", error);
      }
    },
    [item, crateId, moveFileMutation, moveFolderMutation, onClose]
  );

  const isMoving = moveFileMutation.isPending || moveFolderMutation.isPending;

  if (!item) return null;

  const folders = paginatedResult?.items || [];
  const totalCount = paginatedResult?.totalCount || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {item.isFolder ? <Folder size={20} /> : <File size={20} />}
            Move "{item.name}"
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

          <div className="flex-1 min-h-0  rounded-md">
            <div className="max-h-[400px] overflow-y-auto">
              {folders.map((folder) => (
                <div key={folder.id} className="flex items-center justify-between space-y-4">
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
                    Move To
                  </Button>
                </div>
              ))}
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
