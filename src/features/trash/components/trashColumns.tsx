import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/shared/components/ui/checkbox";
import DateIndicator from "@/shared/components/indicators/DateIndicator";
import StorageDisplay from "@/shared/components/indicators/StorageDisplay";
import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import type { TrashItem } from "../trashTypes";
import TrashItemNameCell from "./TashItemNameCell";
import TrashActionMenu from "./TrashActionMenu";

const columnHelper = createColumnHelper<TrashItem>();

export const trashColumns = (
  trashItems: TrashItem[],
  onRestore?: (item: TrashItem) => void,
  onDelete?: (item: TrashItem) => void
) => {
  const columns = [
    columnHelper.display({
      id: "select",
      size: 2,
      minSize: 2,
      header: () => {
        const { fileIds, folderIds, selectAll, deselectAll } = useSelectionStore();
        const modifiableItems = trashItems.filter((item) => item.canRestore || item.canPermanentlyDelete);

        const allModifiableSelected =
          modifiableItems.length > 0 &&
          modifiableItems.every((item) => (item.type === "Folder" ? folderIds.has(item.id) : fileIds.has(item.id)));

        const handleToggleAll = () => {
          if (allModifiableSelected) {
            deselectAll();
          } else {
            const itemsToSelect = modifiableItems.map((item) => ({
              id: item.id,
              isFolder: item.type === "Folder",
              name: item.name,
            }));
            selectAll(itemsToSelect);
          }
        };

        return modifiableItems.length > 0 ? (
          <Checkbox checked={allModifiableSelected} onCheckedChange={handleToggleAll} />
        ) : (
          <div className="w-4 h-4" />
        );
      },
      cell: (info) => {
        const item = info.row.original;
        const canModify = item.canRestore || item.canPermanentlyDelete;
        const { fileIds, folderIds, toggleSelection } = useSelectionStore();
        const isSelected = item.type === "Folder" ? folderIds.has(item.id) : fileIds.has(item.id);

        if (!canModify) {
          return <div className="w-4 h-4" />;
        }

        return (
          <Checkbox checked={isSelected} onCheckedChange={() => toggleSelection(item.id, item.type === "Folder")} />
        );
      },
    }),
    columnHelper.accessor("crateName", {
      header: "Crate",
      size: 15,
      minSize: 10,
      cell: ({ row }) => (
        <div className="flex justify-start items-center gap-2">
          <p className="text-sm text-muted-foreground">{row.original.crateName}</p>
        </div>
      ),
    }),
    columnHelper.accessor("name", {
      header: () => <div className="text-left">Name</div>,
      size: 53,
      minSize: 28,
      cell: (info) => <TrashItemNameCell item={info.row.original} />,
    }),
    columnHelper.accessor("deletedByUserName", {
      header: "Deleted By",
      size: 12,
      minSize: 10,
      cell: ({ row }) => (
        <div className="flex justify-start items-center gap-2">
          <p className="text-sm">{row.original.deletedByUserName}</p>
        </div>
      ),
    }),
    columnHelper.accessor("deletedAt", {
      header: "Deleted At",
      size: 10,
      minSize: 10,
      cell: ({ row }) => (
        <div className="flex justify-start items-center gap-2">
          <DateIndicator date={row.original.deletedAt} />
        </div>
      ),
    }),
    columnHelper.display({
      id: "size",
      header: "Size",
      size: 10,
      minSize: 10,
      cell: ({ row }) =>
        row.original.type === "Folder" ? (
          <div className="flex justify-start items-center gap-2">
            <p>-</p>
          </div>
        ) : (
          <div className="flex justify-start items-center gap-2">
            <StorageDisplay storage={row.original.sizeInBytes ?? 0} />
          </div>
        ),
    }),
    columnHelper.display({
      id: "controls",
      header: "",
      size: 5,
      minSize: 5,
      cell: (info) => <TrashActionMenu item={info.row.original} onRestore={onRestore} onDelete={onDelete} />,
    }),
  ];
  return columns;
};
