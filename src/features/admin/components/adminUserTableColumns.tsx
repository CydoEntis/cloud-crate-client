import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/shared/components/ui/badge";
import UserAvatar from "@/shared/components/UserAvatar";
import DateIndicator from "@/shared/components/DateIndicator";
import StorageDisplay from "@/shared/components/StorageDisplay";
import type { AdminUser, SubscriptionPlan } from "../adminTypes";
import AdminUserActionsMenu from "./AdminUserActionsMenu";
import TruncatedText from "@/shared/components/TruncatedText";

const columnHelper = createColumnHelper<AdminUser>();

export function adminUserTableColumns({
  onBan,
  onUnban,
  onMakeAdmin,
  onRemoveAdmin,
  onUpdatePlan,
}: {
  users: AdminUser[];
  onBan: (id: string) => void;
  onUnban: (id: string) => void;
  onMakeAdmin: (id: string) => void;
  onRemoveAdmin: (id: string) => void;
  onUpdatePlan: (id: string, plan: SubscriptionPlan) => void;
}) {
  return [
    columnHelper.accessor("displayName", {
      header: "User",
      size: 40,
      minSize: 30,
      cell: ({ row }) => {
        const { displayName, email, profilePictureUrl } = row.original;
        return <UserAvatar displayName={displayName} email={email} profilePictureUrl={profilePictureUrl || ""} />;
      },
    }),
    columnHelper.accessor("plan", {
      header: "Plan",
      size: 15,
      minSize: 10,
      cell: ({ row }) => (
        <Badge variant="outline" className="text-xs">
          {row.original.plan}
        </Badge>
      ),
    }),
    columnHelper.accessor("usedStorageBytes", {
      header: "Storage Used",
      size: 15,
      minSize: 10,
      cell: ({ row }) => <StorageDisplay storage={row.original.usedStorageBytes} />,
    }),
    columnHelper.accessor("isAdmin", {
      header: "Role",
      size: 15,
      minSize: 10,
      cell: ({ row }) => (
        <Badge variant={row.original.isAdmin ? "default" : "secondary"}>
          {row.original.isAdmin ? "Admin" : "User"}
        </Badge>
      ),
    }),
    columnHelper.accessor("isLocked", {
      header: "Status",
      size: 15,
      minSize: 10,
      cell: ({ row }) => (
        <Badge variant={row.original.isLocked ? "destructive" : "default"}>
          {row.original.isLocked ? "Banned" : "Active"}
        </Badge>
      ),
    }),
    columnHelper.accessor("createdAt", {
      header: "Joined",
      size: 15,
      minSize: 10,
      cell: ({ row }) => <DateIndicator date={row.original.createdAt} />,
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      size: 5,
      minSize: 5,
      cell: ({ row }) => (
        <AdminUserActionsMenu
          user={row.original}
          onBan={onBan}
          onUnban={onUnban}
          onMakeAdmin={onMakeAdmin}
          onRemoveAdmin={onRemoveAdmin}
          onUpdatePlan={onUpdatePlan}
        />
      ),
    }),
  ];
}
