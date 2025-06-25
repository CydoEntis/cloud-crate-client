import { MoreVertical } from "lucide-react";
import { getFileColor } from "./util/file.utils";

type RecentFileProps = {
  name: string;
  size: string;
  extension: string;
  icon: React.ReactNode;
};

export const RecentFile = ({ name, size, extension, icon }: RecentFileProps) => {
  const bg = getFileColor(extension);
  return (
    <div className="flex justify-between items-center w-[300px] border rounded-xl p-2 shadow-sm">
      <div className="flex items-center gap-2 w-full">
        <div className=" text-white p-4 rounded-xl" style={{ backgroundColor: bg }}>
          {icon}
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-md">{name}</h3>
            <MoreVertical size={20} />
          </div>
          <p className="text-gray-500 text-sm">
            {size} – {extension}
          </p>
        </div>
      </div>
    </div>
  );
};
