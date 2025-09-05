import type { CrateDetails } from "@/features/crates/types/CrateDetails";
import AvailableStorageBar from "./AvailableStorageBar";
import { mimeCategoryColors } from "@/lib/getMimeCategory";

type Props = {
  crate: CrateDetails;
};

const AvailableStorageIndicator = ({ crate }: Props) => {
  const { totalUsedStorage, storageLimit, remainingStorage, breakdownByType } = crate;
  console.log(crate);
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
      usedStorage: remainingStorage,
      color: "var(--color-secondary)",
    },
  ];

  return <AvailableStorageBar totalUsedStorage={totalUsedStorage} storageLimit={storageLimit} segments={segments} />;
};

export default AvailableStorageIndicator;
