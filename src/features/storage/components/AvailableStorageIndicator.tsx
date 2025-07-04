import { useCrateUsage } from "@/features/storage/hooks";

type AvailableStorageIndicatorProps = {
  crateId: string;
};

const colors = ["bg-emerald-400", "bg-sky-400", "bg-indigo-400", "bg-pink-400", "bg-yellow-400", "bg-red-400"];

const AvailableStorageIndicator = ({ crateId }: AvailableStorageIndicatorProps) => {
  const { data, isLoading, error } = useCrateUsage(crateId);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Failed to load storage data</p>;

  const { totalUsedStorage, storageLimit, remainingStorage, breakdownByType } = data;

  console.log(data);

  const b = breakdownByType.map((c, i) => ({
    id: c.type,
    name: c.type,
    usedStorage: c.sizeMb,
    color: colors[i % colors.length],
  }));

  b.push({
    id: "remaining",
    name: "Available",
    usedStorage: remainingStorage,
    color: "bg-gray-200 dark:bg-gray-700",
  });

  return (
    <div className="py-4 flex flex-col">
      <h5 className="text-md text-muted-foreground font-semibold">Total Storage</h5>

      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-1 items-end">
          <h3 className="font-semibold text-2xl">{totalUsedStorage.toFixed(1)} MB</h3>
          <p className="text-muted-foreground text-md font-semibold">used</p>
        </div>

        <div className="flex gap-1 items-end">
          <p className="text-muted-foreground text-md font-semibold">from</p>
          <h3 className="font-semibold text-2xl">{storageLimit.toFixed(0)} MB</h3>
        </div>
      </div>

      {/* Color bar */}
      <div className="w-full rounded-md overflow-hidden flex gap-1 my-2" style={{ height: 16 }}>
        {b.map((entry) => {
          const percent = entry.usedStorage === 0 ? 0 : Math.max((entry.usedStorage / storageLimit) * 100, 1);

          return (
            <div
              key={entry.id}
              className={`${entry.color} rounded-full`}
              style={{ width: `${percent}%`, height: "16px", minWidth: "5px" }}
              title={`${entry.name}: ${entry.usedStorage} MB`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex gap-4 flex-wrap">
        {b.map((entry) => (
          <div key={entry.id} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${entry.color}`} />
            <span className="text-muted-foreground">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableStorageIndicator;
