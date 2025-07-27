import type { ColumnDef } from "@tanstack/react-table";
import type { Crate } from "../types/Crate";
import { Box } from "lucide-react";

export const crateTableColumns: ColumnDef<Crate>[] = [
  {
    accessorKey: "name",
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
    header: "Owner",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <span>{row.original.owner}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => new Date(row.original.name).toLocaleDateString(),
  },
];
