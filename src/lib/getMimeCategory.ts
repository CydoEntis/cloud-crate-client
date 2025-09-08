export const mimeCategoryColors: Record<string, string> = {
  Images: "#D783FF",        // purple (from your palette)
  Videos: "#7BC4FD",        // blue
  Audio: "#FFCE8E",         // orange/yellow
   PDF: "#FF6B6B",           // red
  Text: "#A0D4FF",          // lighter blue
  Spreadsheets: "#9CEFB2",  // lighter green
  Code: "#FFE0B3",          // lighter orange
  Archives: "#C55CFF",      // darker purple
  Other: "#374151",          // gray fallback
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
