import { getFileColor } from "@/features/files/util/getFileColor";
import { getFileIcon } from "@/features/files/util/getFileIcon";
import { Folder } from "lucide-react";

type FileIndicatorProps = {
  filename?: string;
  isFolder?: boolean;
  folderColor?: string;
};

const FileIndicator = ({ filename, isFolder, folderColor }: FileIndicatorProps) => {
  if (!filename || typeof filename !== "string") return null;

  const ext = filename.split(".").pop() ?? "";
  const bg = isFolder ? folderColor : getFileColor(ext);
  const Icon = isFolder ? Folder : getFileIcon(ext);
  return (
    <div className="p-2 rounded-md flex items-center justify-center" style={{ backgroundColor: bg }}>
      <Icon className="w-5 h-5 text-white" />
    </div>
  );
};

export default FileIndicator;
