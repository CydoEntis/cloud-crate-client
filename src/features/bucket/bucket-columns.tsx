import FileIndicator from "@/components/FileIndicator";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<StoredFile>();

export const bucketColumns = [
  columnHelper.accessor("fileName", {
    header: "File Name",
    cell: (info) => {
      const fileName = info.getValue();
      const rowId = info.row.id;
      console.log(fileName);

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
    cell: (info) => {
      return <p>{info.getValue()}</p>;
    },
  }),
  columnHelper.accessor("size", {
    header: "File Size",
    cell: (info) => {
      const size = Number(info.getValue());
      return <p>{size} MB</p>;
    },
  }),
  columnHelper.accessor("uploaded", {
    header: "Uploaded At",
    cell: (info) => {
      return <p>{info.getValue()}</p>;
    },
  }),
];

export type StoredFile = {
  fileName: string;
  owner: string;
  uploaded: string;
  size: string;
};
