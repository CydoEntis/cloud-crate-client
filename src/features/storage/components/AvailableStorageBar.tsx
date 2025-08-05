import type { StorageSegment } from "../types/StorageSegment";
import { formatStorage } from "../util/formatStorage";

type StorageProps = {
  totalUsedStorage: number;
  storageLimit: number;
  segments: StorageSegment[];
};

function AvailableStorageBar({ totalUsedStorage, storageLimit, segments }: StorageProps) {
  return (
    <div className="py-4 flex flex-col">
      <h5 className="text-md text-muted-foreground font-semibold mb-1">Total Storage</h5>

      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-1 items-end">
          <h3 className="font-semibold text-2xl text-foreground">{formatStorage(totalUsedStorage)}</h3>
          <p className="text-muted-foreground text-md font-semibold">used</p>
        </div>
        <div className="flex gap-1 items-end">
          <p className="text-muted-foreground text-md font-semibold">from</p>
          <h3 className="font-semibold text-2xl text-foreground">{formatStorage(storageLimit)}</h3>
        </div>
      </div>

      <div className="w-full h-4 rounded-full overflow-hidden flex gap-1 my-2 ">
        {segments.map((entry) => {
          const percent = (entry.usedStorage / storageLimit) * 100;

          return (
            <div
              key={entry.id}
              className={`${entry.color} h-full rounded-full`}
              style={{
                width: `${percent}%`,
                minWidth: "40px",
              }}
              title={`${entry.name}: ${formatStorage(entry.usedStorage)}`}
            />
          );
        })}
      </div>

      <div className="mt-4 flex gap-4 flex-wrap">
        {segments.map((entry) => (
          <div key={`legend-${entry.id}`} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${entry.color}`} />
            <span className="text-muted-foreground text-sm">
              {entry.name} — {formatStorage(entry.usedStorage)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableStorageBar;
