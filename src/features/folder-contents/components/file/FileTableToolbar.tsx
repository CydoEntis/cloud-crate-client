import { useState } from "react";
import { Plus } from "lucide-react";

import { useBulkMove } from "@/features/bulk/hooks/useBulkMove";
import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import { useBulkDelete } from "@/features/bulk/hooks/useBulkDelete";
import SearchInputField from "@/shared/components/SearchInputField";
import OrderToggle from "@/shared/components/OrderToggle";
import { Button } from "@/shared/components/ui/button";

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
          {/* <SortBySelect
            value={orderBy}
            onChange={onOrderByChange}
            allowedValues={allowedOrderByValues}
            labels={orderByLabels}
          /> */}
          <OrderToggle ascending={ascending} onChange={onAscendingChange} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={onOpenCreateFolder}>
          <Plus className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </div>
    </div>
  );
}
