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
  );
};

export default BucketStorage;
