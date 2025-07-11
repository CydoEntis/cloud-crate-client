import type { CrateDetailsResponse } from "@/features/crates/types";
import AvailableStorageBar from "./AvailableStorageBar";

const colors = ["bg-emerald-400", "bg-sky-400", "bg-indigo-400", "bg-pink-400", "bg-yellow-400", "bg-red-400"];

type Props = {
  crate: CrateDetailsResponse;
};

const AvailableStorageIndicator = ({ crate }: Props) => {
  const { totalUsedStorage, storageLimit, remainingStorage, breakdownByType } = crate;

  const segments = [
    ...breakdownByType.map((item, i) => ({
      id: `type-${item.type}`,
      name: item.type,
      usedStorage: item.sizeMb,
      color: colors[i % colors.length],
    })),
    {
      id: "available",
      name: "Available",
      usedStorage: remainingStorage,
      color: "bg-gray-200 dark:bg-gray-700",
    },
  ];

  return <AvailableStorageBar totalUsedStorage={totalUsedStorage} storageLimit={storageLimit} segments={segments} />;
};

export default AvailableStorageIndicator;
