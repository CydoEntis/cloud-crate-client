import type { CrateDetails } from "@/features/crates/crateTypes";
import AvailableStorageBar from "./AvailableStorageBar";
import { mimeCategoryStyles } from "@/shared/lib/getMimeCategory";
import { Trash2 } from "lucide-react";
import { formatBytes } from "@/shared/lib/formatBytes";
import { Button } from "@/shared/components/ui/button";
import { useEmptyTrash } from "@/features/folder-contents/folder/api/folderQueries";

type Props = {
  crate: CrateDetails;
};

const AvailableStorageIndicator = ({ crate }: Props) => {
  const { usedStorageBytes, allocatedStorageBytes, remainingStorageBytes, breakdownByType, trashStorageBytes } = crate;
  const emptyTrashMutation = useEmptyTrash();

  console.log(trashStorageBytes);

  const handleEmptyTrash = () => {
    emptyTrashMutation.mutate(crate.id);
  };

  const totalUsedIncludingTrash = usedStorageBytes + trashStorageBytes;

  const segments = [
    ...breakdownByType.map((item) => {
      const styles = mimeCategoryStyles[item.type] ?? mimeCategoryStyles.Other;
      return {
        id: `type-${item.type}`,
        name: item.type,
        usedStorage: item.sizeMb,
        bgClass: styles.bg,
      };
    }),
    ...(trashStorageBytes > 0
      ? [
          {
            id: "trash",
            name: "Trash",
            usedStorage: trashStorageBytes,
            bgClass: mimeCategoryStyles.Trash.bg, 
          },
        ]
      : []),
    {
      id: "available",
      name: "Available",
      usedStorage: allocatedStorageBytes - totalUsedIncludingTrash,
      bgClass: "bg-secondary/50",
    },
  ];

  return (
    <div>
      <AvailableStorageBar
        totalUsedStorage={usedStorageBytes}
        storageLimit={allocatedStorageBytes}
        segments={segments}
      />

      {trashStorageBytes > 0 && (
        <div className="mt-4 flex items-center justify-between bg-orange-200  p-3 rounded-lg border border-orange-600">
          <div className="flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-orange-600" />
            <span className="text-sm text-orange-600">
              {formatBytes(trashStorageBytes)} in trash still using storage
            </span>
          </div>
          <Button
            className="border border-orange-600 bg-orange-500 text-foreground hover:!bg-orange-600"
            size="sm"
            onClick={handleEmptyTrash}
            disabled={emptyTrashMutation.isPending}
          >
            {emptyTrashMutation.isPending ? "Emptying..." : "Empty Trash"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AvailableStorageIndicator;
