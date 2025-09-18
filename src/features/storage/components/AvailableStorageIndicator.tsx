import type { CrateDetails } from "@/features/crates/crateTypes";
import AvailableStorageBar from "./AvailableStorageBar";
import { mimeCategoryColors } from "@/shared/lib/getMimeCategory";

type Props = {
  crate: CrateDetails;
};

const AvailableStorageIndicator = ({ crate }: Props) => {
  const { usedStorageBytes, allocatedStorageBytes, remainingStorageBytes, breakdownByType } = crate;
  const segments = [
    ...breakdownByType.map((item) => {
      return {
        id: `type-${item.type}`,
        name: item.type,
        usedStorage: item.sizeMb,
        color: mimeCategoryColors[item.type] ?? mimeCategoryColors.Other,
      };
    }),
    {
      id: "available",
      name: "Available",
      usedStorage: remainingStorageBytes,
      color: "var(--color-secondary)",
    },
  ];

  return <AvailableStorageBar totalUsedStorage={usedStorageBytes} storageLimit={allocatedStorageBytes} segments={segments} />;
};

export default AvailableStorageIndicator;
