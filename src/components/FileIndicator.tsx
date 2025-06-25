import { getFileColor, getFileIcon } from "@/features/files/util/file.utils";
import React from "react";

type FileIndicatorProps = {
  filename?: string;
};

const FileIndicator = ({ filename }: FileIndicatorProps) => {
  if (!filename || typeof filename !== "string") return null;

  const ext = filename.split(".").pop() ?? "";
  const bg = getFileColor(ext);
  const Icon = getFileIcon(ext);


  return (
    <div className="p-2 rounded-md" style={{ backgroundColor: bg }}>
      <Icon className="w-5 h-5 text-white" />
    </div>
  );
};

export default FileIndicator;
