import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Bucket>();

export const bucketColumns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
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
