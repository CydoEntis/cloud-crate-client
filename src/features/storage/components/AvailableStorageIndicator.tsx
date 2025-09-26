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
  const { usedStorageBytes, allocatedStorageBytes, remainingStorageBytes, breakdownByType } = crate;
  const emptyTrashMutation = useEmptyTrash();

  const handleEmptyTrash = () => {
    emptyTrashMutation.mutate(crate.id);
  };

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
    {
      id: "available",
      name: "Available",
      usedStorage: remainingStorageBytes,
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
    </div>
  );
};

export default AvailableStorageIndicator;
