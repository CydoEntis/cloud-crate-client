import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Bucket>();

export const bucketColumns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
        cell: (info) => (
      <div className="flex gap-2 items-center">
        <div className="bg-red-300 rounded-2xl h-10 w-10" />
        <div className="flex flex-col">
        <h4 className="font-bold">{info.getValue()}</h4>
        <p className="text-sm text-gray-400">This is a crate description</p>

        </div>
      </div>
    ),
  }),
  columnHelper.accessor("region", {
    header: "Region",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];

export type Bucket = {
  id: number;
  name: string;
  region: string;
  createdAt: string;
};
