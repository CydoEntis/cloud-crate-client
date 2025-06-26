type Crate = {
  id: string;
  name: string;
  usedStorage: number;
  color: string;
};

const totalStorage = 5 * 1024 * 1024 * 1024; // 5 GB

const crates: Crate[] = [
  { id: "1", name: "Photos", usedStorage: 1_500_000_000, color: "bg-blue-500" },
  { id: "2", name: "Videos", usedStorage: 2_000_000_000, color: "bg-red-500" },
  { id: "3", name: "Backups", usedStorage: 500_000_000, color: "bg-yellow-500" },
  { id: "4", name: "Logs", usedStorage: 400_000_000, color: "bg-green-500" },
];

const BucketStorage = () => {
  const usedStorage = crates.reduce((sum, crate) => sum + crate.usedStorage, 0);
  const remainingStorage = Math.max(totalStorage - usedStorage, 0);

  const displayCrates: Crate[] = [
    ...crates,
    {
      id: "remaining",
      name: "Available",
      usedStorage: remainingStorage,
      color: "bg-gray-200 dark:bg-gray-700",
    },
  ];

  return (
    <div className="py-4 flex flex-col">
      <h5 className="text-md text-muted-foreground font-semibold">Total Storage</h5>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-end">
          <h3 className="font-semibold text-2xl">{(usedStorage / 1024 / 1024 / 1024).toFixed(1)} GB</h3>
          <p className="text-muted-foreground text-md font-semibold">used</p>
        </div>

        <div className="flex gap-1 items-end">
          <p className="text-muted-foreground text-md font-semibold">from</p>
          <h3 className="font-semibold text-2xl">{(totalStorage / 1024 ** 3).toFixed(2)} GB</h3>
        </div>
      </div>

      {/* Storage bar */}
      <div className="w-full h-2 rounded-md overflow-hidden flex gap-1 my-2">
        {displayCrates.map((crate) => {
          const percent = (crate.usedStorage / totalStorage) * 100;

          return (
            <div
              key={crate.id}
              className={`${crate.color} h-full rounded-full`}
              style={{ width: `${percent}%` }}
              title={`${crate.name}: ${(crate.usedStorage / 1024 / 1024).toFixed(1)} MB`}
            />
          );
        })}
      </div>

      {/* Color Key / Legend */}
      <div className="mt-3 flex gap-4">
        {displayCrates.map((crate) => (
          <div key={crate.id} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${crate.color}`} />
            <span className="text-muted-foreground">{crate.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BucketStorage;
