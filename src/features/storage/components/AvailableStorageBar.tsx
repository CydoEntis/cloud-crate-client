import { formatBytes } from "@/shared/lib/formatBytes";
import type { StorageSegment } from "../types/StorageSegment";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip";

type StorageProps = {
  totalUsedStorage: number;
  storageLimit: number;
  segments: StorageSegment[];
};

function AvailableStorageBar({ totalUsedStorage, storageLimit, segments }: StorageProps) {
  const minWidthPx = 10;
  const containerWidthPx = 100;

  // Map segments to include rawPercent and enforce min 1%
  let allSegments = segments.map((s) => {
    const rawPercent = (s.usedStorage / storageLimit) * 100;
    return {
      ...s,
      rawPercent: rawPercent < 1 ? 1 : Math.round(rawPercent),
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
    <TooltipProvider>
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 text-foreground pb-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">Storage Overview</h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            <span className="text-foreground text-base sm:text-lg md:text-xl font-medium">
              {formatBytes(totalUsedStorage)}
            </span>{" "}
            <span className="text-xs sm:text-sm md:text-base">out of</span>{" "}
            <span className="text-foreground text-base sm:text-lg md:text-xl font-medium">
              {formatBytes(storageLimit)}
            </span>{" "}
            <span className="text-xs sm:text-sm md:text-base">used</span>
          </p>
        </div>

        <div className="w-full flex gap-2">
          {sortedSegments.map((s) => {
            const scaledPercent = Math.max(s.rawPercent * scale, (minWidthPx / containerWidthPx) * 100);

            return (
              <div key={s.id} style={{ width: `${scaledPercent}%` }} className="relative">
                {/* Desktop labels - hidden on mobile */}
                <div className="hidden md:flex justify-between items-center text-foreground mb-1 text-xs">
                  <div className="flex gap-1 items-center truncate">
                    <div className={`rounded h-3 w-3 ${s.bgClass}`} />
                    <span className="truncate">{s.name}</span>
                  </div>
                  <span>{s.rawPercent}%</span>
                </div>

                {/* Interactive bar with tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`
                        h-2 rounded cursor-pointer transition-all duration-200 
                        ${s.bgClass}
                        hover:brightness-110 active:brightness-125
                        md:hover:h-3 md:hover:-translate-y-0.5
                        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                        focus-visible:outline-none
                      `}
                      role="button"
                      tabIndex={0}
                      aria-label={`${s.name}: ${s.rawPercent}% (${formatBytes(s.usedStorage)})`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex items-center gap-2">
                      <div className={`rounded h-2 w-2 ${s.bgClass}`} />
                      <span className="font-medium">{s.name}</span>
                      <span className="text-muted-foreground">•</span>
                      <span>{s.rawPercent}%</span>
                      <span className="text-muted-foreground">•</span>
                      <span>{formatBytes(s.usedStorage)}</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}

export default AvailableStorageBar;
