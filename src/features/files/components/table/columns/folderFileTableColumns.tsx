import { createColumnHelper } from "@tanstack/react-table";
import NameCell from "./NameCell";
import SizeCell from "./SizeCell";
import FolderOrFileActionsMenu from "../../FolderOrFileActionsMenu";
import type { FolderOrFileItem } from "@/features/folder/types/FolderOrFileItem";
import UserAvatar from "@/components/UserAvatar";
import DateIndicator from "@/components/DateIndicator";
import StorageDisplay from "@/components/StorageDisplay";

const columnHelper = createColumnHelper<FolderOrFileItem>();

const folderFileTableColumns = () => [
  columnHelper.accessor("name", {
    header: "Name",
    size: 55,
    minSize: 30,
    cell: (info) => <NameCell row={info.row.original} />,
  }),

  columnHelper.accessor("uploadedByDisplayName", {
    header: "Uploaded By",
    size: 20,
    minSize: 20,
    cell: ({ row }) => {
      return (
        <UserAvatar
          displayName={row.original.uploadedByDisplayName}
          profilePictureUrl={row.original.uploadedByProfilePictureUrl}
          email={row.original.uploadedByEmail}
        />
      );
    },
  }),

  columnHelper.accessor("createdAt", {
    header: "Uploaded At",
    size: 10,
    minSize: 10,
    cell: ({ row }) => <DateIndicator date={row.original.createdAt} />,
  }),

  columnHelper.accessor("sizeInBytes", {
    header: "Size",
    size: 10,
    minSize: 10,
    cell: ({row}) => <StorageDisplay storage={row.original.sizeInBytes!} />,
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
