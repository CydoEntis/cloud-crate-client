export const mimeCategoryColors: Record<string, string> = {
  Images: "#773bbf",        // purple (matches your palette)
  Videos: "#fad937",        // yellow
  Audio: "#faa032",         // orange
  PDF: "#f53141",           // red 
  Text: "#1793e6",          // lighter variant of blue
  Spreadsheets: "#55b33b",  // green
  Code: "#586ac4",          // lighter variant of orange
  Archives: "#7a5e37",      // darker purple variant
  Other: "#374151",         // gray fallback
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
