import { useCrateUsage } from "@/features/storage/hooks";

type AvailableStorageIndicatorProps = {
  crateId: string;
};

const colors = ["bg-emerald-400", "bg-sky-400", "bg-indigo-400", "bg-pink-400", "bg-yellow-400", "bg-red-400"];

const formatStorage = (mb: number): string => (mb >= 1024 ? `${(mb / 1024).toFixed(2)} GB` : `${mb.toFixed(2)} MB`);

const AvailableStorageIndicator = ({ crateId }: AvailableStorageIndicatorProps) => {
  const { data, isLoading, error } = useCrateUsage(crateId);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Failed to load storage data</p>;

  const { totalUsedStorage, storageLimit, remainingStorage, breakdownByType } = data;

  const breakdownEntries = breakdownByType.map((item, i) => ({
    id: `type-${item.type}`,
    name: item.type,
    usedStorage: item.sizeMb,
    color: colors[i % colors.length],
  }));

  breakdownEntries.push({
    id: "available",
    name: "Available",
    usedStorage: remainingStorage,
    color: "bg-gray-200 dark:bg-gray-700",
  });

  return (
    <div className="py-4 flex flex-col">
      <h5 className="text-md text-muted-foreground font-semibold mb-1">Total Storage</h5>

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-1 items-end">
          <h3 className="font-semibold text-2xl">{formatStorage(totalUsedStorage)}</h3>
          <p className="text-muted-foreground text-md font-semibold">used</p>
        </div>
        <div className="flex gap-1 items-end">
          <p className="text-muted-foreground text-md font-semibold">from</p>
          <h3 className="font-semibold text-2xl">{formatStorage(storageLimit)}</h3>
        </div>
      </div>

      {/* Bar Segments */}
      <div className="w-full h-4 rounded-full overflow-hidden flex gap-1 my-2">
        {breakdownEntries.map((entry) => {
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

      {/* Legend */}
      <div className="mt-4 flex gap-4 flex-wrap">
        {breakdownEntries.map((entry) => (
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
};

export default AvailableStorageIndicator;
