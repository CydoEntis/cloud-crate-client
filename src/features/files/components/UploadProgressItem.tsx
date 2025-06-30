import React, { useEffect, useState } from "react";
import {
  FileText,
  FileCode2,
  FileMusic,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  File as FileIcon,
  X,
} from "lucide-react";
import { getFileColor, getFileExtension, getFileIcon } from "../util/file.utils";

type UploadProgressItemProps = {
  fileName: string;
  percent: number;
  onClose?: () => void;
};

export function UploadProgressItem({ fileName, percent, onClose }: UploadProgressItemProps) {
  const [visible, setVisible] = useState(true);

  const ext = getFileExtension(fileName);
  const color = getFileColor(ext);
  const Icon = getFileIcon(ext);

  useEffect(() => {
    if (percent === 100) {
      const timeout = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [percent]);

  // Notify parent when hidden
  useEffect(() => {
    if (!visible && onClose) {
      onClose();
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="w-full border rounded-lg p-3 shadow-sm flex items-center gap-3 max-w-[250px]">
      <div
        className="p-2 rounded"
        style={{ backgroundColor: color, color: "white", flexShrink: 0 }}
        title={ext.toUpperCase()}
      >
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-700 mb-1 truncate" title={fileName}>
          {fileName}
        </div>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div
            className="h-full rounded transition-all duration-200"
            style={{ width: `${percent}%`, backgroundColor: color }}
          />
        </div>
        <div className="text-xs text-right text-gray-500 mt-1">{percent}%</div>
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close upload progress"
        className="ml-2 p-1 text-gray-400 hover:text-gray-700"
        type="button"
      >
        <X size={18} />
      </button>
    </div>
  );
}
