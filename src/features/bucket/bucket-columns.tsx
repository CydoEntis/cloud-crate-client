import { Progress } from "@/components/ui/progress";
import { createColumnHelper } from "@tanstack/react-table";
import Avatar from "boring-avatars";

const columnHelper = createColumnHelper<Bucket>();

export const bucketColumns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <div className="flex gap-2 items-center">
        <Avatar name={info.getValue()} size={40} variant="marble" square className="rounded-xl" />
        <div className="flex flex-col">
          <h4 className="font-bold">{info.getValue()}</h4>
          <p className="text-sm text-gray-400">This is a crate description</p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor("storage", {
    header: "Storage",
    cell: (info) => {
      const used = Number(info.getValue()); // assuming it's numeric or can be converted
      const max = 100; // total capacity
      const percent = Math.min((used / max) * 100, 100);

      return (
        <div className="w-32 flex gap-2 items-center">
          <div className="mb-1 text-xs font-medium text-muted-foreground">{percent.toFixed(0)}%</div>
          <Progress value={percent} />
        </div>
      );
    },
  }),

  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
];

export type Bucket = {
  id: number;
  name: string;
  storage: string;
  createdAt: string;
};
