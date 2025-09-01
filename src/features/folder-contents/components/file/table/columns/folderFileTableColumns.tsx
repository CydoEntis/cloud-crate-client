import { createColumnHelper } from "@tanstack/react-table";
import NameCell from "./NameCell";
// import FolderOrFileActionsMenu from "../../FolderOrFileActionsMenu";
import type { CrateFile } from "@/features/folder-contents/types/file/CrateFile";
import type { CrateFolder } from "@/features/folder-contents/types/folder/CrateFolder";
import UserAvatar from "@/components/UserAvatar";
import DateIndicator from "@/components/DateIndicator";
import StorageDisplay from "@/components/StorageDisplay";
import SelectCell from "./SelectCell";

type FolderContentRowItem = CrateFile | CrateFolder;

const columnHelper = createColumnHelper<FolderContentRowItem>();

const folderFileTableColumns = (selectMode: boolean) => {
  const columns = [
    ...(selectMode
      ? [
          columnHelper.display({
            id: "select",
            size: 2,
            minSize: 2,
            cell: (info) => <SelectCell row={info.row} />,
          }),
        ]
      : []),

    columnHelper.accessor("name", {
      header: () => <div className="text-left">Name</div>,
      size: 53,
      minSize: 28,
      cell: (info) => <NameCell row={info.row.original} />,
    }),

    columnHelper.accessor("uploader.displayName", {
      header: "Uploaded By",
      size: 20,
      minSize: 20,
      cell: ({ row }) =>
        row.original.isFolder ? (
          <div className="text-right flex justify-end items-center gap-2">
            <p>-</p>
          </div>
        ) : (
          <div className="text-right flex justify-end items-center gap-2">
            <UserAvatar
              displayName={row.original.uploader.displayName}
              profilePictureUrl={row.original.uploader.profilePictureUrl!}
              email={row.original.uploader.email}
            />
          </div>
        ),
    }),

    columnHelper.accessor("createdAt", {
      header: "Uploaded At",
      size: 10,
      minSize: 10,
      cell: ({ row }) =>
        row.original.isFolder ? (
          <div className="text-right flex justify-end items-center gap-2">
            <p>-</p>
          </div>
        ) : (
          <div className="text-right flex justify-end items-center gap-2">
            <DateIndicator date={row.original.createdAt} />
          </div>
        ),
    }),

    columnHelper.accessor("sizeInBytes", {
      header: "Size",
      size: 10,
      minSize: 10,
      cell: ({ row }) =>
        row.original.isFolder ? (
          <div className="text-right flex justify-end items-center gap-2">
            <p>-</p>
          </div>
        ) : (
          <div className="text-right flex justify-end items-center gap-2">
            <StorageDisplay storage={row.original.sizeInBytes ?? 0} />
          </div>
        ),
    }),

    columnHelper.display({
      id: "controls",
      header: "",
      size: 5,
      minSize: 5,
      cell: (info) => <p>Placeholder</p>//<FolderOrFileActionsMenu row={info.row.original} />,
    }),
  ];

  return columns;
};

export default folderFileTableColumns;
