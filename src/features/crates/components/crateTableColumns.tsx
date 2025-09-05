import type { ColumnDef } from "@tanstack/react-table";
import type { Crate } from "../types/Crate";
import CrateActionsMenu from "./CrateActionsMenu";
import UserAvatar from "@/components/UserAvatar";
import CrateIndicator from "./CrateIndicator";
import DateIndicator from "@/components/DateIndicator";
import StorageRadialProgress from "@/components/StorageProgressbar";

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
      header: () => <div className="text-right">Owner</div>,
      cell: ({ row }) => {
        const { displayName, profilePicture, email } = row.original.owner;
        return (
          <div className="text-right flex justify-end items-center gap-2">
            <UserAvatar displayName={displayName} profilePictureUrl={profilePicture} email={email} />
          </div>
        );
      },
    },
    {
      accessorKey: "storage",
      size: 10,
      minSize: 10,
      header: () => <div className="text-right">Storage</div>,
      cell: ({ row }) => (
        <div className="text-right flex justify-end items-center gap-2">
          <StorageRadialProgress
            used={row.original.usedStorageBytes}
            total={row.original.totalStorageBytes}
            size={40}
            strokeWidth={6}
          />
        </div>
      ),
    },
    {
      accessorKey: "joinedAt",
      size: 10,
      minSize: 10,
      header: () => <div className="text-right">Joined</div>,
      cell: ({ row }) => (
        <div className="text-right flex justify-end items-center gap-2">
          <DateIndicator date={row.original.joinedAt} />
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right"> </div>, // always right aligned
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
