import { formatBytes } from "@/lib/formatBytes";
import { HardDrive } from "lucide-react";

type StorageDisplayProps = {
  storage: number;
};

function StorageDisplay({ storage }: StorageDisplayProps) {
  return (
    <div className="text-right flex justify-end items-center gap-2">
      <HardDrive className="w-4 h-4 text-muted-foreground" />
      {formatBytes(storage)}
    </div>
  );
}

export default StorageDisplay;
