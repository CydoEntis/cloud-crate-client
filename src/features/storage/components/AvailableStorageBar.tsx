import { formatBytes } from "@/shared/lib/formatBytes";
import type { StorageSegment } from "../types/StorageSegment";

type StorageProps = {
  totalUsedStorage: number;
  storageLimit: number;
  segments: StorageSegment[];
};

function AvailableStorageBar({ totalUsedStorage, storageLimit, segments }: StorageProps) {
  const minWidthPx = 10; // minimum readable width in px
  const containerWidthPx = 100; // percent

  // Map segments to include rawPercent and enforce min 1%
  let allSegments = segments.map((s) => {
    const rawPercent = (s.usedStorage / storageLimit) * 100;
    return {
      ...s,
      rawPercent: rawPercent < 1 ? 1 : Math.round(rawPercent), // round and enforce min 1%
    };
  });

  // Fix total so it sums to exactly 100%
  const totalPercent = allSegments.reduce((sum, s) => sum + s.rawPercent, 0);
  const difference = 100 - totalPercent;
  if (difference !== 0) {
    const largestIndex = allSegments.reduce(
      (maxIdx, s, idx, arr) => (s.rawPercent > arr[maxIdx].rawPercent ? idx : maxIdx),
      0
    );
    allSegments[largestIndex].rawPercent += difference;
  }

  // Scale segments proportionally with minWidth
  const segmentCount = allSegments.length;
  const minTotalPercent = (minWidthPx / containerWidthPx) * 100 * segmentCount;
  const scale = Math.max(1, (100 - minTotalPercent) / (100 - minTotalPercent));

  // Sort "Other" and "Available" last
  const sortedSegments = allSegments.sort((a, b) => {
    const lastItems = ["Other", "Available"];
    if (lastItems.includes(a.name) && !lastItems.includes(b.name)) return 1;
    if (!lastItems.includes(a.name) && lastItems.includes(b.name)) return -1;
    return 0;
  });

  return (
    <div>
      <div className="flex justify-between items-center text-foreground pb-4">
        <h3 className="text-xl">Storage Overview</h3>
        <p className="text-muted-foreground">
          <span className="text-foreground text-lg">{formatBytes(totalUsedStorage)}</span> out of{" "}
          <span className="text-foreground text-lg">{formatBytes(storageLimit)}</span> used
        </p>
      </div>
      <div className="w-full flex gap-2">
        {sortedSegments.map((s) => {
          const scaledPercent = Math.max(s.rawPercent * scale, (minWidthPx / containerWidthPx) * 100);
          return (
            <div key={s.id} style={{ width: `${scaledPercent}%` }} className="relative">
              <div className="flex justify-between items-center text-foreground mb-1 text-xs">
                <div className="flex gap-1 items-center truncate">
                  <div className="rounded h-4 w-4" style={{ backgroundColor: s.color }} />
                  <span className="truncate">{s.name}</span>
                </div>
                <span>{s.rawPercent}%</span>
              </div>
              <div className="h-6 rounded" style={{ backgroundColor: s.color }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AvailableStorageBar;
