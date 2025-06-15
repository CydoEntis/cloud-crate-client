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

export const getFileBg = (extension: string): string => {
  return fileTypeBackgrounds[extension.toLowerCase()] || fileTypeBackgrounds.default;
};
