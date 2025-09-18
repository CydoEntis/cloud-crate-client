// export const mimeCategoryColors: Record<string, string> = {
//   Images: "#773bbf",        // purple (matches your palette)
//   Videos: "#fad937",        // yellow
//   Audio: "#faa032",         // orange
//   PDF: "#f53141",           // red
//   Text: "#1793e6",          // lighter variant of blue
//   Spreadsheets: "#55b33b",  // green
//   Code: "#586ac4",          // lighter variant of orange
//   Archives: "#7a5e37",      // darker purple variant
//   Other: "#374151",         // gray fallback
// };

// mimeCategoryColors.ts
export const mimeCategoryStyles: Record<
  string,
  {
    color: string; // For your current usage
    bg: string; // For background with opacity
    border: string; // For borders
    text: string; // For text color
  }
> = {
  Images: {
    color: "#8b5cf6", // Keep hex for CSS custom properties
    bg: "bg-purple-400/80",
    border: "border-purple-500/30",
    text: "text-purple-600",
  },
  Videos: {
    color: "#facc15",
    bg: "bg-yellow-400/80",
    border: "border-yellow-400/30",
    text: "text-yellow-600",
  },
  Audio: {
    color: "#fb923c",
    bg: "bg-orange-400/80",
    border: "border-orange-400/30",
    text: "text-orange-600",
  },
  PDF: {
    color: "#ef4444",
    bg: "bg-red-400/80",
    border: "border-red-500/30",
    text: "text-red-600",
  },
  Text: {
    color: "#3b82f6",
    bg: "bg-blue-400/80",
    border: "border-blue-500/30",
    text: "text-blue-600",
  },
  Spreadsheets: {
    color: "#22c55e",
    bg: "bg-green-400/80",
    border: "border-green-500/30",
    text: "text-green-600",
  },
  Code: {
    color: "#6366f1",
    bg: "bg-indigo-400/80",
    border: "border-indigo-500/30",
    text: "text-indigo-600",
  },
  Archives: {
    color: "#b45309",
    bg: "bg-amber-400/80",
    border: "border-amber-600/30",
    text: "text-amber-700",
  },
  Other: {
    color: "#374151",
    bg: "bg-gray-400/80",
    border: "border-gray-600/30",
    text: "text-gray-700",
  },
};

export const mimeCategoryColors: Record<string, string> = Object.fromEntries(
  Object.entries(mimeCategoryStyles).map(([key, value]) => [key, value.bg])
);

export function getMimeCategory(mimeType: string): string {
  if (!mimeType) return "Other";

  if (mimeType.startsWith("image/")) return "Images";
  if (mimeType.startsWith("video/")) return "Videos";
  if (mimeType.startsWith("audio/")) return "Audio";
  if (mimeType === "application/pdf") return "PDF";
  if (mimeType === "text/plain" || mimeType === "application/msword" || mimeType === "application/rtf") return "Text";
  if (
    mimeType === "application/vnd.ms-excel" ||
    mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    mimeType === "text/csv"
  )
    return "Spreadsheets";
  if (
    mimeType === "application/javascript" ||
    mimeType === "text/javascript" ||
    mimeType === "text/css" ||
    mimeType === "application/json" ||
    mimeType === "text/html" ||
    mimeType === "application/xml"
  )
    return "Code";
  if (
    mimeType === "application/zip" ||
    mimeType === "application/x-rar-compressed" ||
    mimeType === "application/x-7z-compressed" ||
    mimeType === "application/x-tar"
  )
    return "Archives";

  return "Other";
}
