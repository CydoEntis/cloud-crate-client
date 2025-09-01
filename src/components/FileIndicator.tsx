import { getFileColor } from "@/features/folder-contents/utils/file/getFileColor";
import { getFileIcon } from "@/features/folder-contents/utils/file/getFileIcon";
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
    <div
      className="rounded-md p-1 flex items-center justify-center"
      style={{ backgroundColor: bg, width: 24, height: 24 }}
    >
      <Icon className="w-5 h-5 text-white" />
    </div>
  );
};

export default FileIndicator;
