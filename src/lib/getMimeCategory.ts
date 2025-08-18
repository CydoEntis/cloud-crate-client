export const mimeCategoryColors: Record<string, string> = {
  Images: "#A855F7", // purple
  Videos: "#0EA5E9", // blue
  Audio: "#EC4899", // pink
  PDF: "#EF4444", // red
  Text: "#3B82F6", // light blue
  Spreadsheets: "#10B981", // green
  Code: "#F7DF1E", // yellow
  Archives: "#F59E0B", // orange
  Other: "#374151", // gray fallback
};

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
