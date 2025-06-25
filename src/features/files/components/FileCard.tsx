import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { getFileBg, getFileIcon } from "../util/file.utils";

type FileCardProps = {
  filename: string;
};

export function FileCard({ filename }: FileCardProps) {
  const extension = filename.split(".").pop()?.toLowerCase() || "default";
  const Icon = getFileIcon(extension);
  const color = getFileBg(extension);

  return (
    <div className="flex flex-col justify-between h-60 bg-white dark:bg-zinc-900 rounded-2xl shadow transition group">
      <div className="flex items-center justify-center h-full transition">
        <Icon
          className="w-20 h-20 text-gray-400 group-hover:text-white p-3 rounded-full transition"
          style={{ backgroundColor: color }}
        />
      </div>

      <div className="flex items-center justify-between mt-auto pt-3 border-t dark:border-zinc-800 p-2 bg-white dark:bg-zinc-900 rounded-b-2xl">
        <p className="text-sm font-medium truncate">{filename}</p>
        <Button variant="ghost" size="icon" className="w-8 h-6 p-0 cursor-pointer">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
