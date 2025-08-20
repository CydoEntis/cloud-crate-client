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
      <h5 className="text-lg sm:text-md text-muted-foreground font-semibold mb-1">Storage</h5>

      <div className="flex justify-between items-end mb-3">
        <div className="flex flex-col items-start leading-none">
          <p className="text-muted-foreground text-xs sm:text-sm font-semibold">used</p>
          <h3 className="font-semibold text-lg md:text-2xl text-foreground">{formatStorage(totalUsedStorage)}</h3>
        </div>

        <div className="flex flex-col items-end leading-none">
          <p className="text-muted-foreground text-xs sm:text-sm font-semibold">total</p>
          <h3 className="font-semibold text-lg md:text-2xl text-foreground">{formatStorage(storageLimit)}</h3>
        </div>
      </div>

      <div className="w-full h-4 sm:h-3 md:h-4 rounded-full overflow-hidden flex gap-1 my-2 min-h-[16px]">
        {segments.map((entry) => {
          const percent = (entry.usedStorage / storageLimit) * 100;

          return (
            <div
              key={entry.id}
              className="h-full rounded-full"
              style={{
                width: `${percent}%`,
                minWidth: "24px", 
                backgroundColor: entry.color,
              }}
              title={`${entry.name}: ${formatStorage(entry.usedStorage)}`}
            />
          );
        })}
      </div>

      <div className="mt-4 flex gap-4 flex-wrap">
        {segments.map((entry) => (
          <div key={`legend-${entry.id}`} className="flex items-center gap-2">
            <div
              className="rounded-sm"
              style={{
                width: 12,
                height: 12,
                backgroundColor: entry.color,
              }}
            />
            <span className="text-muted-foreground text-xs sm:text-sm">
              {entry.name} — {formatStorage(entry.usedStorage)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvailableStorageBar;
