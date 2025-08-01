import type { ColumnDef } from "@tanstack/react-table";
import type { Crate } from "../types/Crate";
import CrateActionsMenu from "./CrateActionsMenu";
import UserAvatar from "@/components/UserAvatar";
import StorageDisplay from "@/components/StorageDisplay";
import CrateIndicator from "./CrateIndicator";
import DateIndicator from "@/components/DateIndicator";

export function crateTableColumns({
  onEdit,
  onDelete,
  onLeave,
}: {
  onEdit: (crate: Crate) => void;
  onDelete: (crateId: string) => void;
  onLeave: (crateId: string) => void;
}): ColumnDef<Crate>[] {
  return [
    {
      accessorKey: "name",
      size: 55,
      minSize: 30,
      header: "Name",
      cell: ({ row }) => <CrateIndicator crateColor={row.original.color} crateName={row.original.name} />,
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
      cell: ({ row }) => <StorageDisplay storage={row.original.usedStorage} />,
    },
    {
      accessorKey: "joinedAt",
      size: 10,
      minSize: 10,
      header: "Joined",
      cell: ({ row }) => <DateIndicator date={row.original.joinedAt} />,
    },
    {
      id: "actions",
      header: "",
      size: 5,
      minSize: 5,
      cell: ({ row }) => {
        const crate = row.original;
        return <CrateActionsMenu crate={crate} onEdit={onEdit} onDelete={onDelete} onLeave={onLeave}/>;
      },
    },
  ];
}
