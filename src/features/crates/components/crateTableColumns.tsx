import { createColumnHelper } from "@tanstack/react-table";
import CrateIndicator from "./CrateIndicator";
import CrateActionsMenu from "./CrateActionsMenu";
import DateIndicator from "@/shared/components/indicators/DateIndicator";
import type { Crate, CrateSummary } from "../crateTypes";
import StorageDisplay from "@/shared/components/indicators/StorageDisplay";
import UserAvatar from "@/shared/components/avatars/UserAvatar";

const columnHelper = createColumnHelper<CrateSummary>();

export function crateTableColumns({
  onDelete,
  onLeave,
}: {
  crates: CrateSummary[];
  onEdit: (crate: Crate) => void;
  onDelete: (id: string) => void;
  onLeave: (id: string) => void;
}) {
  return [
    columnHelper.accessor("name", {
      header: "Name",
      size: 55,
      minSize: 30,
      cell: ({ row }) => (
        <div className="text-left flex items-center gap-2">
          <CrateIndicator crateColor={row.original.color} crateName={row.original.name} />
        </div>
      ),
    }),

    columnHelper.accessor("owner", {
      header: "Owner",
      size: 20,
      minSize: 20,
      cell: ({ row }) => {
        const { displayName, profilePicture, email } = row.original.owner;
        return (
          <div className="text-left flex items-center gap-2">
            <UserAvatar displayName={displayName} profilePictureUrl={profilePicture} email={email} />
          </div>
        );
      },
    }),

    columnHelper.accessor("usedStorageBytes", {
      header: "Used",
      size: 10,
      minSize: 10,
      cell: ({ row }) => <StorageDisplay storage={row.original.usedStorageBytes} />,
    }),

    columnHelper.accessor("allocatedStorageBytes", {
      header: "Allocated",
      size: 10,
      minSize: 10,
      cell: ({ row }) => <StorageDisplay storage={row.original.allocatedStorageBytes} />,
    }),

    columnHelper.accessor("owner.joinedAt", {
      id: "joinedAt",
      header: "Joined",
      size: 10,
      minSize: 10,
      cell: ({ row }) => <DateIndicator date={row.original.owner.joinedAt} />,
    }),

    columnHelper.display({
      id: "actions",
      header: "",
      size: 5,
      minSize: 5,
      cell: ({ row }) => <CrateActionsMenu crate={row.original} onDelete={onDelete} onLeave={onLeave} />,
    }),
  ];
}
