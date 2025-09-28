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
import { CrateRole } from "@/features/crates/crateTypes";
import UserAvatar from "@/shared/components/avatars/UserAvatar";

export type FolderContentRowItem = CrateFile | CrateFolder;

const columnHelper = createColumnHelper<FolderContentRowItem>();

const canModifyItem = (item: FolderContentRowItem, currentMember?: Member): boolean => {
  if (!currentMember) return false;

  if (item.isFolder && (item as CrateFolder).isRoot) {
    return false;
  }

  if (currentMember.role === CrateRole.Owner || currentMember.role === CrateRole.Manager) {
    return true;
  }

  if (currentMember.role === CrateRole.Member) {
    if (!item.isFolder) {
      return (item as CrateFile).uploader?.userId === currentMember.userId;
    }
    return (item as CrateFolder).createdByUserId === currentMember.userId;
  }

  return false;
};

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

        const modifiableItems = folderContents.filter((item) => canModifyItem(item, currentMember));

        const allModifiableSelected =
          modifiableItems.length > 0 &&
          modifiableItems.every((item) => (item.isFolder ? folderIds.has(item.id) : fileIds.has(item.id)));

        const handleToggleAll = () => {
          if (allModifiableSelected) deselectAll();
          else selectAll(modifiableItems);
        };

        return modifiableItems.length > 0 ? (
          <Checkbox checked={allModifiableSelected} onCheckedChange={handleToggleAll} />
        ) : (
          <div className="w-4 h-4" />
        );
      },
      cell: (info) => {
        const canModify = canModifyItem(info.row.original, currentMember);
        return canModify ? <SelectCell row={info.row} /> : <div className="w-4 h-4" />;
      },
    }),

    columnHelper.accessor("name", {
      header: () => <div className="text-left">Name</div>,
      size: 53,
      minSize: 28,
      cell: (info) => <NameCell row={info.row.original} />,
    }),

    columnHelper.display({
      id: "uploadedBy",
      header: "Uploaded By",
      size: 12,
      minSize: 10,
      cell: ({ row }) => {
        const item = row.original;

        if (item.isFolder) {
          return (
            <div className="flex justify-start items-center gap-2">
              <p className="text-sm text-muted-foreground">-</p>
            </div>
          );
        }

        const file = item as CrateFile;

        if (!file.uploader) {
          return (
            <div className="flex justify-start items-center gap-2">
              <p className="text-sm text-muted-foreground">Unknown</p>
            </div>
          );
        }

        return (
          <UserAvatar
            displayName={file.uploader.displayName || file.uploader.email || "Unknown User"}
            email={file.uploader.email || ""}
            profilePictureUrl={file.uploader.profilePictureUrl || ""}
          />
        );
      },
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
