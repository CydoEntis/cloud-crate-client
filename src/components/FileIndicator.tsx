import { getFileColor, getFileIcon } from "@/features/files/util/file.utils";
import { Folder } from "lucide-react";

type FileIndicatorProps = {
  filename?: string;
  isFolder?: boolean;
};

const FileIndicator = ({ filename, isFolder }: FileIndicatorProps) => {
  if (!filename || typeof filename !== "string") return null;

  const ext = filename.split(".").pop() ?? "";
  const bg = isFolder ? "#EAAC00" : getFileColor(ext); // Gray background for folders
  const Icon = isFolder ? Folder : getFileIcon(ext); // Folder icon if it's a folder

  return (
    <div className="p-2 rounded-md flex items-center justify-center" style={{ backgroundColor: bg }}>
      <Icon className="w-5 h-5 text-white" />
    </div>
  );
};

export default FileIndicator;
