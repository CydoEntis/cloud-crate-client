import type { ColumnDef } from "@tanstack/react-table";
import type { Crate } from "../types/Crate";
import { Box, MoreVertical } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/features/auth";
import { formatBytes } from "@/lib/formatBytes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CrateActionsMenu from "./CrateActionsMenu";

export function crateTableColumns({
  onEdit,
  onDelete,
  onLeave,
}: {
  onEdit: (crate: Crate) => void;
  onDelete: (crateId: string) => void;
  onLeave: (crate: Crate) => void;
}): ColumnDef<Crate>[] {
  return [
    {
      accessorKey: "name",
      size: 55,
      minSize: 30,
      header: "Name",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
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
      size: 20,
      minSize: 20,
      header: "Owner",
      cell: ({ row }) => {
        const { displayName, profilePicture, email } = row.original.owner;
        const { user } = useUserStore.getState();

        return (
          <div className="flex justify-end items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <Avatar className="h-6 w-6 cursor-pointer">
                    {profilePicture ? (
                      <AvatarImage src={profilePicture} alt={displayName} />
                    ) : (
                      <AvatarFallback>{displayName?.[0] ?? "?"}</AvatarFallback>
                    )}
                  </Avatar>
                  {user?.email === email && <span className="text-xs text-muted-foreground">(me)</span>}
                </div>
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
      cell: ({ row }) => <div className="text-right">{formatBytes(row.original.usedStorage)}</div>,
    },
    {
      accessorKey: "createdAt",
      size: 10,
      minSize: 10,
      header: "Joined",
      cell: ({ row }) => <div className="text-right">{new Date(row.original.joinedAt).toLocaleDateString()}</div>,
    },
    {
      id: "actions",
      header: "",
      size: 5,
      minSize: 5,
      cell: ({ row }) => {
        const crate = row.original;
        return <CrateActionsMenu crate={crate} onEdit={onEdit} onDelete={onDelete}/>;
      },
    },
  ];
}
