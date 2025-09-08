import type { ColumnDef } from "@tanstack/react-table";
import type { Crate } from "../types/Crate";
import CrateActionsMenu from "./CrateActionsMenu";
import UserAvatar from "@/components/UserAvatar";
import CrateIndicator from "./CrateIndicator";
import DateIndicator from "@/components/DateIndicator";
import StorageProgressbar from "@/components/StorageProgressbar";

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
      header: () => <div className="text-left">Name</div>,
      cell: ({ row }) => (
        <div className="text-left flex items-center gap-2">
          <CrateIndicator crateColor={row.original.color} crateName={row.original.name} />
        </div>
      ),
    },
    {
      accessorKey: "owner",
      size: 20,
      minSize: 20,
      header: () => <div className="text-left">Owner</div>,
      cell: ({ row }) => {
        const { displayName, profilePicture, email } = row.original.owner;
        return (
          <div className="text-left flex justify-start items-center gap-2">
            <UserAvatar displayName={displayName} profilePictureUrl={profilePicture} email={email} />
          </div>
        );
      },
    },
    {
      accessorKey: "storage",
      size: 10,
      minSize: 10,
      header: () => <div className="text-left">Storage</div>,
      cell: ({ row }) => (
        <div className="text-left flex justify-start items-center gap-2">
          <StorageProgressbar used={300000000} total={row.original.totalStorageBytes} />
        </div>
      ),
    },
    {
      accessorKey: "joinedAt",
      size: 10,
      minSize: 10,
      header: () => <div className="text-left">Joined</div>,
      cell: ({ row }) => (
        <div className="text-left flex justify-start items-center gap-2">
          <DateIndicator date={row.original.owner.joinedAt} />
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right"> </div>,
      size: 5,
      minSize: 5,
      cell: ({ row }) => {
        const crate = row.original;
        return (
          <div className="text-right flex justify-end">
            <CrateActionsMenu crate={crate} onEdit={onEdit} onDelete={onDelete} onLeave={onLeave} />
          </div>
        );
      },
    },
  ];
}
