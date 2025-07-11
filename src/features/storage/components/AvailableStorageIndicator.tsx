import type { FileTypeBreakdown } from "@/features/files/types";
import { useCrateUsage } from "../hooks";
import AvailableStorageBar from "./AvailableStorageBar";

const colors = ["bg-emerald-400", "bg-sky-400", "bg-indigo-400", "bg-pink-400", "bg-yellow-400", "bg-red-400"];

type Props = {
  crateId: string;
};

const AvailableStorageIndicator = ({ crateId }: Props) => {
  const { data, isLoading, error } = useCrateUsage(crateId);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Failed to load storage data</p>;

  const { totalUsedStorage, storageLimit, remainingStorage, breakdownByType } = data;

  const segments = [
    ...breakdownByType.map((item: FileTypeBreakdown, i: number) => ({
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
