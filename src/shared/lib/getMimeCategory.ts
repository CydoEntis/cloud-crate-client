export const mimeCategoryStyles: Record<
  string,
  {
    color: string; 
    bg: string; 
    border: string; 
    text: string; 
  }
> = {
  Images: {
    color: "#8b5cf6", // purple
    bg: "bg-purple-400/80",
    border: "border-purple-500/30",
    text: "text-purple-600",
  },
  Videos: {
    color: "#facc15", // yellow
    bg: "bg-yellow-400/80",
    border: "border-yellow-400/30",
    text: "text-yellow-600",
  },
  Audio: {
    color: "#6366f1", // indigo (shifted from orange)
    bg: "bg-indigo-400/80",
    border: "border-indigo-500/30",
    text: "text-indigo-600",
  },
  PDF: {
    color: "#ef4444", // red
    bg: "bg-red-400/80",
    border: "border-red-500/30",
    text: "text-red-600",
  },
  Text: {
    color: "#3b82f6", // blue
    bg: "bg-blue-400/80",
    border: "border-blue-500/30",
    text: "text-blue-600",
  },
  Spreadsheets: {
    color: "#22c55e", // green
    bg: "bg-green-400/80",
    border: "border-green-500/30",
    text: "text-green-600",
  },
  Code: {
    color: "#f59e0b", // amber (shifted from Archives)
    bg: "bg-amber-400/80",
    border: "border-amber-500/30",
    text: "text-amber-600",
  },
  Archives: {
    color: "#7c3aed", // violet/darker purple
    bg: "bg-purple-700/80",
    border: "border-purple-800/30",
    text: "text-purple-200",
  },
  Other: {
    color: "#374151", // gray
    bg: "bg-gray-400/80",
    border: "border-gray-600/30",
    text: "text-gray-700",
  },
  Trash: {
    color: "#f97316", // orange
    bg: "bg-orange-400/80",
    border: "border-orange-500/30",
    text: "text-orange-600",
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
