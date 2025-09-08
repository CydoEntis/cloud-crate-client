import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import { Button } from "@/components/ui/button";
import { Trash2, Move } from "lucide-react";
import { useBulkDelete } from "@/features/bulk/hooks/useBulkDelete";
import { useBulkMove } from "@/features/bulk/hooks/useBulkMove";
import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type Props = {
  crateId: string;
  folderId?: string | null;
  folderDestinations?: { id: string; name: string }[];
  refetch?: () => void;
};

export default function BulkActionBar({ crateId, folderId, folderDestinations = [], refetch }: Props) {
  const { fileIds, folderIds, getFinalMoveSelection, clearSelection } = useSelectionStore();
  const selectedCount = fileIds.size + folderIds.size;

  const bulkMove = useBulkMove(crateId, folderId);
  const bulkDelete = useBulkDelete(crateId, folderId);

  const [moveTarget, setMoveTarget] = useState<string>("");

  if (selectedCount === 0) return null;

  const handleMove = async () => {
    if (!moveTarget) return;

    const { fileIds, folderIds } = getFinalMoveSelection();
    await bulkMove.mutateAsync({
      crateId,
      sourceFolderId: folderId ?? null,
      newParentId: moveTarget,
      fileIds,
      folderIds,
    });

    setMoveTarget("");
    clearSelection();
    refetch?.();
  };

  const handleDelete = async () => {
    const { fileIds, folderIds } = getFinalMoveSelection();
    if (fileIds.length === 0 && folderIds.length === 0) return;

    await bulkDelete.mutateAsync({ fileIds, folderIds });
    clearSelection();
    refetch?.();
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-auto text-foreground bg-card border border-input shadow-xl rounded-xl p-4 flex items-center gap-4 z-50">
      <p className="font-semibold">{selectedCount} selected</p>

      {folderDestinations.length > 0 && (
        <div className="flex items-center gap-2">
          <Select value={moveTarget} onValueChange={setMoveTarget}>
            <SelectTrigger className="w-[180px]  border-input hover:text-accent-foreground hover:bg-accent text-foreground">
              <SelectValue placeholder="Move to..." />
            </SelectTrigger>
            <SelectContent className="shadow-md rounded-md  border-input">
              {folderDestinations.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleMove} disabled={!moveTarget}>
            <Move /> Move
          </Button>
          <Button variant="outline" onClick={handleDelete} className="flex items-center gap-2">
            <Trash2 /> Delete
          </Button>
        </div>
      )}
    </div>
  );
}
