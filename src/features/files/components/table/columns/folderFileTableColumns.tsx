import { createColumnHelper } from "@tanstack/react-table";
import NameCell from "./NameCell";
import FolderOrFileActionsMenu from "../../FolderOrFileActionsMenu";
import type { FolderOrFileItem } from "@/features/folder/types/FolderOrFileItem";
import UserAvatar from "@/components/UserAvatar";
import DateIndicator from "@/components/DateIndicator";
import StorageDisplay from "@/components/StorageDisplay";

import SelectCell from "./SelectCell";

const columnHelper = createColumnHelper<FolderOrFileItem>();

const folderFileTableColumns = () => [
  columnHelper.display({
    id: "select",
    size: 2,
    minSize: 2,
    cell: (info) => <SelectCell row={info.row} />,
  }),
  columnHelper.accessor("name", {
    header: () => <div className="text-left">Name</div>,
    size: 53,
    minSize: 28,
    cell: (info) => <NameCell row={info.row.original} />,
  }),

  columnHelper.accessor("uploadedByDisplayName", {
    header: "Uploaded By",
    size: 20,
    minSize: 20,
    cell: ({ row }) => {
      if (row.original.isBackRow)
        return (
          <div className="text-right flex justify-end items-center gap-2">
            <p>-</p>
          </div>
        );

      return (
        <div className="text-right flex justify-end items-center gap-2">
          <UserAvatar
            displayName={row.original.uploadedByDisplayName}
            profilePictureUrl={row.original.uploadedByProfilePictureUrl}
            email={row.original.uploadedByEmail}
          />
        </div>
      );
    },
  }),

  columnHelper.accessor("createdAt", {
    header: "Uploaded At",
    size: 10,
    minSize: 10,
    cell: ({ row }) =>
      row.original.isBackRow ? (
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
      row.original.isBackRow ? (
        <div className="text-right flex justify-end items-center gap-2">
          <p>-</p>
        </div>
      ) : (
        <div className="text-right flex justify-end items-center gap-2">
          <StorageDisplay storage={row.original.sizeInBytes!} />
        </div>
      ),
  }),

  columnHelper.display({
    id: "controls",
    header: "",
    size: 5,
    minSize: 5,
    cell: (info) => <FolderOrFileActionsMenu row={info.row.original} />,
  }),
];

export default folderFileTableColumns;
