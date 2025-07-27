import { createColumnHelper } from "@tanstack/react-table";
import NameCell from "./NameCell";
import SizeCell from "./SizeCell";
import ActionsCell from "./ActionsCell";
import type { FolderOrFileItem } from "@/features/folder/types/FolderOrFileItem";

const columnHelper = createColumnHelper<FolderOrFileItem>();

const folderFileTableColumns = () => [
  columnHelper.accessor("name", {
    header: "Name",
    meta: { width: "60%" },
    cell: (info) => <NameCell row={info.row.original} />,
  }),

  columnHelper.accessor("sizeInBytes", {
    header: "Size",
    meta: { width: "10%" },
    cell: (info) => <SizeCell size={info.getValue()} />,
  }),

  columnHelper.display({
    id: "controls",
    meta: { width: "5%" },
    cell: (info) => <ActionsCell row={info.row.original} />,
  }),
];

export default folderFileTableColumns;
