import { MoreVertical } from "lucide-react";
import { getFileColor } from "../util/getFileColor";

type RecentFileProps = {
  name: string;
  size: string;
  extension: string;
  icon: React.ReactNode;
};

function RecentFile({ name, size, extension, icon }: RecentFileProps) {
  const bg = getFileColor(extension);
  return (
    <div className="flex justify-between items-center w-[300px] bg-card rounded-xl p-2 shadow-sm">
      <div className="flex items-center gap-2 w-full">
        <div className=" text-white p-4 rounded-xl" style={{ backgroundColor: bg }}>
          {icon}
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="text-md text-foreground">{name}</h3>
            <MoreVertical size={20} className="text-foreground"/>
          </div>
          <p className="text-muted-foreground text-sm">
            {size} – {extension}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecentFile;
