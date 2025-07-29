import type { ColumnDef } from "@tanstack/react-table";
import type { Crate } from "../types/Crate";
import { Box } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const crateTableColumns: ColumnDef<Crate>[] = [
  {
    accessorKey: "name",
    size: 50,
    minSize: 30, // ensures it doesn't collapse
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
    minSize: 20,
    header: "Owner",
    cell: ({ row }) => {
      const { displayName, profilePicture } = row.original.owner;

      return (
        <div className="flex justify-end items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-6 w-6 cursor-pointer">
                {profilePicture ? (
                  <AvatarImage src={profilePicture} alt={displayName} />
                ) : (
                  <AvatarFallback>{displayName?.[0] ?? "?"}</AvatarFallback>
                )}
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{displayName}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
  {
    accessorKey: "storage",
    size: 10,
    minSize: 10,
    header: "Storage",
    cell: ({ row }) => <div className="text-right">{row.original.totalStorageUsed}</div>,
  },
  {
    accessorKey: "createdAt",
    size: 10,
    minSize: 10,
    header: "Joined",
    cell: ({ row }) => <div className="text-right">{new Date(row.original.joinedAt).toLocaleDateString()}</div>,
  },
];
