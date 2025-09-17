import { createColumnHelper } from "@tanstack/react-table";
import CrateIndicator from "./CrateIndicator";
import CrateActionsMenu from "./CrateActionsMenu";
import UserAvatar from "@/shared/components/UserAvatar";
import StorageProgressbar from "@/shared/components/StorageProgressbar";
import DateIndicator from "@/shared/components/DateIndicator";
import type { Crate } from "../crateTypes";

const columnHelper = createColumnHelper<Crate>();

export function crateTableColumns({
  crates,
  onEdit,
  onDelete,
  onLeave,
}: {
  crates: Crate[];
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

    columnHelper.accessor("totalStorageBytes", {
      header: "Storage",
      size: 10,
      minSize: 10,
      cell: ({ row }) => <StorageProgressbar used={300_000_000} total={row.original.totalStorageBytes} />,
    }),

    columnHelper.accessor("owner.joinedAt", {
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
      cell: ({ row }) => (
        <CrateActionsMenu crate={row.original} onEdit={onEdit} onDelete={onDelete} onLeave={onLeave} />
      ),
    }),
  ];
}
