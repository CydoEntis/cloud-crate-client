import { createColumnHelper } from "@tanstack/react-table";
import type { Crate } from "../types/Crate";
import CrateIndicator from "./CrateIndicator";
import UserAvatar from "@/components/UserAvatar";
import CrateActionsMenu from "./CrateActionsMenu";
import CrateSelectCell from "./CrateSelectCell";
import StorageProgressbar from "@/components/StorageProgressbar";
import DateIndicator from "@/components/DateIndicator";
import SelectAllCrates from "./SelectAllCrates";

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
  // Used for bulk selecting crates
  const allIds = crates.map((c) => c.id);

  return [
    // Leaving this in incase we ever want to go back to allowing bulk selections for Crates
    // columnHelper.display({
    //   id: "select",
    //   size: 2,
    //   minSize: 2,
    //   header: () => <SelectAllCrates allIds={allIds} />,
    //   cell: ({ row }) => <CrateSelectCell crate={row.original} />,
    // }),

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
