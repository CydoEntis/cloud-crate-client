import FileIndicator from "@/components/FileIndicator";
import { Button } from "@/components/ui/button";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<StoredFile>();

export const bucketColumns = [
  columnHelper.accessor("fileName", {
    header: "File Name",
    meta: { width: "50%" },
    cell: (info) => {
      const fileName = info.getValue();
      const rowId = info.row.id;

      return (
        <div key={rowId} className="flex gap-2 items-center">
          <FileIndicator filename={fileName} />
          <h4 className="font-bold">{fileName}</h4>
        </div>
      );
    },
  }),
  columnHelper.accessor("owner", {
    header: "File Owner",
    meta: { width: "20%" },
    cell: (info) => {
      return <p>{info.getValue()}</p>;
    },
  }),
  columnHelper.accessor("size", {
    header: "File Size",
    meta: { width: "10%" },

    cell: (info) => {
      const size = Number(info.getValue());
      return <p>{size} MB</p>;
    },
  }),
  columnHelper.accessor("uploaded", {
    header: "Uploaded At",
    meta: { width: "10%" },
    cell: (info) => {
      return <p>{info.getValue()}</p>;
    },
  }),
  columnHelper.display({
    id: "actions",
    meta: { width: "10%" },
    header: "Actions",
    cell: (info) => {
      const row = info.row.original;

      return (
        <div className="flex gap-2">
          <Button className="bg-blue-500" onClick={() => console.log("Edit", row)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={() => console.log("Delete", row)}>
            Delete
          </Button>
        </div>
      );
    },
  }),
];

export type StoredFile = {
  fileName: string;
  owner: string;
  uploaded: string;
  size: string;
};
