import {
  FileText,
  FileCode2,
  FileMusic,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  File as FileIcon,
} from "lucide-react";

const fileTypeBackgrounds: Record<string, string> = {
  // Text-related
  txt: "#3B82F6",
  docx: "#3B82F6",
  rtf: "#3B82F6",

  // Excel-related
  xls: "#10B981",
  xlsx: "#10B981",
  csv: "#10B981",

  // PDF
  pdf: "#EF4444",

  // Code-related
  js: "#06B6D4",
  jsx: "#06B6D4",
  ts: "#06B6D4",
  tsx: "#06B6D4",
  html: "#06B6D4",
  css: "#06B6D4",
  json: "#06B6D4",

  // Image-related
  jpg: "#A855F7",
  jpeg: "#A855F7",
  png: "#A855F7",
  gif: "#A855F7",
  svg: "#A855F7",
  webp: "#A855F7",

  // Audio/music
  mp3: "#EC4899",
  wav: "#EC4899",
  flac: "#EC4899",

  // Compressed
  zip: "#F59E0B",
  rar: "#F59E0B",
  "7z": "#F59E0B",
  tar: "#F59E0B",

  // Fallback
  default: "#374151",
};

const fileTypeIcons: Record<string, React.ElementType> = {
  // Text-related
  txt: FileText,
  docx: FileText,
  rtf: FileText,

  // Excel-related
  xls: FileSpreadsheet,
  xlsx: FileSpreadsheet,
  csv: FileSpreadsheet,

  // PDF
  pdf: FileIcon,

  // Code-related
  js: FileCode2,
  jsx: FileCode2,
  ts: FileCode2,
  tsx: FileCode2,
  html: FileCode2,
  css: FileCode2,
  json: FileCode2,

  // Image-related
  jpg: FileImage,
  jpeg: FileImage,
  png: FileImage,
  gif: FileImage,
  svg: FileImage,
  webp: FileImage,

  // Audio/music
  mp3: FileMusic,
  wav: FileMusic,
  flac: FileMusic,

  // Compressed
  zip: FileArchive,
  rar: FileArchive,
  "7z": FileArchive,
  tar: FileArchive,

  // Fallback
  default: FileIcon,
};

export const getFileColor = (extension: string): string => {
  return fileTypeBackgrounds[extension.toLowerCase()] || fileTypeBackgrounds.default;
};

export const getFileIcon = (extension: string): React.ElementType => {
  return fileTypeIcons[extension.toLowerCase()] || fileTypeIcons.default;
};
