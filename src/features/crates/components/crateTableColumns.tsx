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
import UserAvatar from "@/components/UserAvatar";
import StorageDisplay from "@/components/StorageDisplay";

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
        return <UserAvatar displayName={displayName} profilePictureUrl={profilePicture} email={email} />;
      },
    },
    {
      accessorKey: "storage",
      size: 10,
      minSize: 10,
      header: "Storage",
      cell: ({ row }) => (<StorageDisplay storage={row.original.usedStorage} />),
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
        return <CrateActionsMenu crate={crate} onEdit={onEdit} onDelete={onDelete} />;
      },
    },
  ];
}
