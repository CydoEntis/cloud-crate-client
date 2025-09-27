import { createColumnHelper } from "@tanstack/react-table";
import NameCell from "./table/NameCell";
import SelectCell from "./table/SelectCell";
import { useSelectionStore } from "@/features/bulk/store/useSelectionStore";
import { Checkbox } from "@/shared/components/ui/checkbox";
import DateIndicator from "@/shared/components/indicators/DateIndicator";
import StorageDisplay from "@/shared/components/indicators/StorageDisplay";
import type { CrateFile } from "@/features/folder-contents/file/fileTypes";
import type { CrateFolder } from "@/features/folder-contents/folder/folderTypes";
import FolderContentsActionMenu from "./FolderContentsActionMenu";
import type { Member } from "@/features/members/memberTypes";

export type FolderContentRowItem = CrateFile | CrateFolder;

const columnHelper = createColumnHelper<FolderContentRowItem>();

export const folderContentsColumns = (
  folderContents: FolderContentRowItem[],
  currentMember?: Member,
  onEditFolder?: (folder: CrateFolder) => void,
  onEditFile?: (file: CrateFile) => void,
  onMoveItem?: (item: FolderContentRowItem) => void
) => {
  const columns = [
    columnHelper.display({
      id: "select",
      size: 2,
      minSize: 2,
      header: () => {
        const { fileIds, folderIds, selectAll, deselectAll } = useSelectionStore();

        const allSelected =
          folderContents.length > 0 &&
          folderContents.every((item) => (item.isFolder ? folderIds.has(item.id) : fileIds.has(item.id)));

        const handleToggleAll = () => {
          if (allSelected) deselectAll();
          else selectAll(folderContents);
        };

        return <Checkbox checked={allSelected} onCheckedChange={handleToggleAll} />;
      },
      cell: (info) => <SelectCell row={info.row} />,
    }),

    columnHelper.accessor("name", {
      header: () => <div className="text-left">Name</div>,
      size: 53,
      minSize: 28,
      cell: (info) => <NameCell row={info.row.original} />,
    }),

    columnHelper.accessor("createdAt", {
      header: "Uploaded At",
      size: 10,
      minSize: 10,
      cell: ({ row }) =>
        row.original.isFolder ? (
          <div className="flex justify-start items-center gap-2">
            <p>-</p>
          </div>
        ) : (
          <div className="flex justify-start items-center gap-2">
            <DateIndicator date={row.original.createdAt} />
          </div>
        ),
    }),

    columnHelper.display({
      id: "size",
      header: "Size",
      size: 10,
      minSize: 10,
      cell: ({ row }) =>
        row.original.isFolder ? (
          <div className="flex justify-start items-center gap-2">
            <p>-</p>
          </div>
        ) : (
          <div className="flex justify-start items-center gap-2">
            <StorageDisplay storage={(row.original as CrateFile).sizeInBytes ?? 0} />
          </div>
        ),
    }),

    columnHelper.display({
      id: "controls",
      header: "",
      size: 5,
      minSize: 5,
      cell: (info) => (
        <FolderContentsActionMenu
          row={info.row.original}
          currentMember={currentMember}
          onEditFolder={onEditFolder}
          onEditFile={onEditFile}
          onMoveItem={onMoveItem}
        />
      ),
    }),
  ];

  return columns;
};
