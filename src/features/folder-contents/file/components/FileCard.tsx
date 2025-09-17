import { MoreHorizontal } from "lucide-react";
import { getFileColor, getFileIcon } from "../fileUtils";
import { Button } from "@/shared/components/ui/button";

type FileCardProps = {
  filename: string;
};

function FileCard({ filename }: FileCardProps) {
  const extension = filename.split(".").pop()?.toLowerCase() || "default";
  const Icon = getFileIcon(extension);
  const color = getFileColor(extension);

  return (
    <div className="group flex flex-col justify-between h-30 bg-white dark:bg-zinc-900 rounded-2xl shadow overflow-hidden transition">
      {/* Icon Area */}
      <div className="flex items-center justify-center h-full">
        <Icon className="w-12 h-12 transition-colors duration-300 text-gray-400 group-hover:text-indigo-400" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t dark:border-zinc-800 p-2 bg-white dark:bg-zinc-900 rounded-b-2xl">
        <p className="text-sm font-medium truncate">{filename}</p>
        <Button variant="ghost" size="icon" className="w-8 h-6 p-0 cursor-pointer">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

export default FileCard;
