import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, SquareCheck, Trash2, X } from "lucide-react";

import SearchInputField from "@/components/SearchInputField";
import SortBySelect from "@/components/OrderBySelect";
import OrderToggle from "@/components/OrderToggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useBulkMove } from "@/features/bulk/hooks/useBulkMove";
import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import { useBulkDelete } from "@/features/bulk/hooks/useBulkDelete";

type OrderBy = "Name" | "CreatedAt" | "Size";

export type FolderDestination = {
  id: string;
  name: string;
};

type SelectedItem = {
  id: string;
  type: "file" | "folder";
};

type Props = {
  crateId: string;
  folderId?: string | null;
  search: string;
  onSearchChange: (val: string) => void;
  orderBy: OrderBy;
  onOrderByChange: (val: OrderBy) => void;
  ascending: boolean;
  onAscendingChange: (val: boolean) => void;
  onOpenCreateFolder: () => void;
  allowedOrderByValues: readonly OrderBy[];
  selectMode: boolean;
  onToggleSelectMode: (enabled: boolean) => void;
  folderDestinations?: FolderDestination[];
  refetch?: () => void;
};

const orderByLabels: Record<OrderBy, string> = {
  Name: "File Name",
  CreatedAt: "Created Date",
  Size: "Size",
};

export default function FileTableToolbar({
  crateId,
  folderId,
  search,
  onSearchChange,
  orderBy,
  onOrderByChange,
  ascending,
  onAscendingChange,
  onOpenCreateFolder,
  allowedOrderByValues,
  selectMode,
  onToggleSelectMode,
  folderDestinations = [],
  refetch,
}: Props) {

  console.log(folderId);
  const [moveTarget, setMoveTarget] = useState<string>("");

  const { fileIds, folderIds, getFinalMoveSelection, clearSelection } = useSelectionStore();
  const bulkMove = useBulkMove(crateId, folderId);
  const bulkDelete = useBulkDelete(crateId, folderId);

  const selectedItems: SelectedItem[] = [
    ...Array.from(fileIds).map((id) => ({ id, type: "file" as const })),
    ...Array.from(folderIds).map((id) => ({ id, type: "folder" as const })),
  ];

  const handleMove = async () => {
    if (!moveTarget || selectedItems.length === 0) return;

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
    if (selectedItems.length === 0) return;

    const { fileIds, folderIds } = getFinalMoveSelection();

    if (fileIds.length === 0 && folderIds.length === 0) return;

    await bulkDelete.mutateAsync({
      fileIds: fileIds.map((id) => id),
      folderIds: folderIds.map((id) => id),
    });

    clearSelection();
    refetch?.();
  };

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <SearchInputField value={search} onChange={onSearchChange} placeholder="Search files & folders..." />
        <div className="flex items-center gap-2">
          <SortBySelect
            value={orderBy}
            onChange={onOrderByChange}
            allowedValues={allowedOrderByValues}
            labels={orderByLabels}
          />
          <OrderToggle ascending={ascending} onChange={onAscendingChange} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {selectMode && selectedItems.length > 0 && (
          <div className="flex items-center gap-2">
            {folderDestinations.length > 0 && (
              <div className="flex items-center gap-1">
                <Select value={moveTarget} onValueChange={setMoveTarget}>
                  <SelectTrigger className="w-[180px] border-none bg-input text-foreground">
                    <SelectValue placeholder="Move to..." />
                  </SelectTrigger>
                  <SelectContent className="border-none shadow-md rounded-xl bg-card">
                    {folderDestinations.map((f) => (
                      <SelectItem key={f.id} value={f.id}>
                        {f.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="text-foreground bg-secondary" onClick={handleMove} disabled={!moveTarget}>
                  Move
                </Button>
              </div>
            )}

            <Button variant="secondary" onClick={handleDelete}>
              <Trash2 />
            </Button>
          </div>
        )}

        <Button onClick={onOpenCreateFolder}>
          <Plus className="mr-2 h-4 w-4" />
          New Folder
        </Button>

        <Button
          className="bg-secondary text-foreground"
          variant="default"
          onClick={() => onToggleSelectMode(!selectMode)}
        >
          {selectMode ? <X /> : <SquareCheck />}
        </Button>
      </div>
    </div>
  );
}
