import FileIndicator from "@/components/FileIndicator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import type { StoredFile } from "../../files/types";

const columnHelper = createColumnHelper<StoredFile>();

const crateColumns = [
  columnHelper.accessor("name", {
    header: "Name",
    meta: { width: "60%" },
    cell: (info) => {
      const fileName = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex gap-2 items-center">
          <FileIndicator filename={fileName} isFolder={row.isFolder} folderColor={row.folderColor} />
          <h4 className="font-bold">{fileName}</h4>
        </div>
      );
    },
  }),

  columnHelper.accessor("uploadedBy", {
    header: "Uploaded By",
    meta: { width: "15%" },
    cell: (info) => <p>{info.getValue()}</p>,
  }),

  columnHelper.accessor("size", {
    header: "Size",
    meta: { width: "10%" },
    cell: (info) => {
      const size = info.getValue() as number;
      return <p>{size === 0 ? "-" : `${size} MB`}</p>;
    },
  }),

  columnHelper.accessor("uploadDate", {
    header: "Uploaded At",
    meta: { width: "10%" },
    cell: (info) => {
      const raw = info.getValue();
      if (!raw) return <p>-</p>;

      const date = new Date(raw);
      const formatted = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return <p>{formatted}</p>;
    },
  }),

  columnHelper.display({
    id: "controls",
    meta: { width: "5%" },
    cell: (info) => {
      const row = info.row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
              <MoreVertical size={20} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                console.log("Rename", row);
              }}
            >
              Rename
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                console.log("Delete", row);
              }}
            >
              Delete
            </DropdownMenuItem>

            {row.isFolder && (
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Change color", row);
                }}
              >
                Change Color
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];

export default crateColumns;
