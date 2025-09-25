import { HardDrive } from "lucide-react";
import { formatBytes } from "../../lib/formatBytes";

type StorageDisplayProps = {
  storage: number;
};

function StorageDisplay({ storage }: StorageDisplayProps) {
  return (
    <div className="text-right flex items-center gap-2">
      <p className="text-muted-foreground">{formatBytes(storage)}</p>
      <HardDrive className="w-4 h-4 text-muted-foreground" />
    </div>
  );
}

export default StorageDisplay;
