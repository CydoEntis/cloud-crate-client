import { useState } from "react";
import { useBulkDelete } from "../hooks/useBulkDelete";
import { useBulkMove } from "../hooks/useBulkMove";
import { useBulkRestore } from "../hooks/useBulkRestore";
import { useSelectionStore } from "../store/useSelectionStore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAvailableMoveTargets } from "@/features/folder/hooks/useAvailableMoveTargets";
import FolderPicker from "@/features/folder/components/FolderPicker";
import { useParams } from "@tanstack/react-router";

type BulkActionsToolBarProps = {
  crateId: string;
  folderId?: string | null;
};

function BulkActionsToolBar({ crateId, folderId = null }: BulkActionsToolBarProps) {
  const { fileIds, folderIds, clearSelection } = useSelectionStore();

  const moveMutation = useBulkMove(crateId);
  const deleteMutation = useBulkDelete(crateId);
  const restoreMutation = useBulkRestore(crateId);

  const [moveDialogOpen, setMoveDialogOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const { data: folders = [], isLoading } = useAvailableMoveTargets(crateId, folderId);
  if (fileIds.size === 0 && folderIds.size === 0) return null;

  const selection = {
    fileIds: [...fileIds],
    folderIds: [...folderIds],
  };

  const handleMove = () => {
    if (!selectedFolder) return;
    moveMutation.mutate({ ...selection, newParentId: selectedFolder });
    setMoveDialogOpen(false);
    clearSelection();
  };

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-secondary rounded-xl px-4 py-2 flex gap-3">
        <Button onClick={() => setMoveDialogOpen(true)}>Move</Button>
        <Button onClick={() => restoreMutation.mutate(selection)}>Restore</Button>
        <Button variant="destructive" onClick={() => deleteMutation.mutate(selection)}>
          Delete
        </Button>

        <Button
          className="bg-secondary border-muted-foreground text-muted-foreground"
          variant="default"
          onClick={clearSelection}
        >
          Cancel
        </Button>
      </div>

      <Dialog open={moveDialogOpen} onOpenChange={setMoveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a destination folder</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <p>Loading folders...</p>
          ) : (
            <FolderPicker folders={folders} currentFolderId={crateId} onSelect={setSelectedFolder} />
          )}

          <DialogFooter>
            <Button onClick={handleMove} disabled={!selectedFolder}>
              Move Here
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default BulkActionsToolBar;
