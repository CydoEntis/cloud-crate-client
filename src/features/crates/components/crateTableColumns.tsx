import type { ColumnDef } from "@tanstack/react-table";
import type { Crate } from "../types/Crate";
import { Box } from "lucide-react";

export const crateTableColumns: ColumnDef<Crate>[] = [
  {
    accessorKey: "name",
    size: 50,
    header: "Name",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <div
          className="rounded-md p-1 flex items-center justify-center"
          style={{ backgroundColor: row.original.color, width: 24, height: 24 }}
        >
          <Box size={16} className="text-white" />
        </div>
        <h3 className="font-semibold">{row.original.name}</h3>
      </div>
    ),
  },
  {
    accessorKey: "owner",
    size: 30,
    header: "Owner",
    cell: ({ row }) => (
      <div className="text-right">
        <span>{row.original.owner}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    size: 20,
    header: "Created",
    cell: ({ row }) => (
      <div className="text-right">
        {new Date(row.original.name).toLocaleDateString()}
      </div>
    ),
  },
];
