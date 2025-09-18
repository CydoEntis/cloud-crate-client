import type { CrateDetails } from "@/features/crates/crateTypes";
import AvailableStorageBar from "./AvailableStorageBar";
import { mimeCategoryStyles } from "@/shared/lib/getMimeCategory"; // Import the full styles

type Props = {
  crate: CrateDetails;
};

const AvailableStorageIndicator = ({ crate }: Props) => {
  const { usedStorageBytes, allocatedStorageBytes, remainingStorageBytes, breakdownByType } = crate;

  const segments = [
    ...breakdownByType.map((item) => {
      const styles = mimeCategoryStyles[item.type] ?? mimeCategoryStyles.Other;
      return {
        id: `type-${item.type}`,
        name: item.type,
        usedStorage: item.sizeMb,
        bgClass: styles.bg, // Pass the Tailwind bg class instead of color
      };
    }),
    {
      id: "available",
      name: "Available",
      usedStorage: remainingStorageBytes,
      bgClass: "bg-secondary/50", // Use Tailwind class here too
    },
  ];

  return (
    <AvailableStorageBar totalUsedStorage={usedStorageBytes} storageLimit={allocatedStorageBytes} segments={segments} />
  );
};

export default AvailableStorageIndicator;
