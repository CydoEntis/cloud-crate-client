import FileIndicator from "@/components/FileIndicator";
import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";
import { MoreVertical } from "lucide-react";
import type { StoredFile } from "../files/types";

const columnHelper = createColumnHelper<StoredFile>();

export const bucketColumns = [
  columnHelper.accessor("name", {
    header: "Name",
    meta: { width: "60%" },
    cell: (info) => {
      const fileName = info.getValue();
      const row = info.row.original;

      return (
        <div className="flex gap-2 items-center">
          <FileIndicator filename={fileName} isFolder={row.isFolder} />
          <h4 className="font-bold">{fileName}</h4>
        </div>
      );
    },
  }),
  columnHelper.accessor("uploadedBy", {
    header: "Uploaded By",
    meta: { width: "15%" },
    cell: (info) => {
      return <p>{info.getValue()}</p>;
    },
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
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => console.log("Edit", row)}>
            <MoreVertical size={30} />
          </Button>
        </div>
      );
    },
  }),
];
