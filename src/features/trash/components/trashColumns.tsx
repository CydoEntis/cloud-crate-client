import DateIndicator from "@/components/DateIndicator";
import StorageDisplay from "@/components/StorageDisplay";
import NameCell from "@/features/folder-contents/components/table/NameCell";
import type { FolderOrFileItem } from "@/features/folder-contents/types/folder/FolderOrFileItem";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<FolderOrFileItem>();

export const trashTableColumns = () => [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => <NameCell row={info.row.original} />,
  }),
  columnHelper.accessor("sizeInBytes", {
    header: "Size",
    cell: ({ row }) => <StorageDisplay storage={row.original.sizeInBytes!} />,
  }),
  columnHelper.display({
    id: "controls",
    header: "",
    cell: ({ row }) => <p>Place Holder</p>,
  }),
];
