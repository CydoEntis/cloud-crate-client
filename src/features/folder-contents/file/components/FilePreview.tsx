import { FileText, Download } from "lucide-react";
import { useEffect, useState } from "react";

type FilePreviewProps = {
  file: {
    url: string;
    mimeType: string;
    name: string;
  };
};

export function FilePreview({ file }: FilePreviewProps) {
  const { url, mimeType, name } = file;

  if (mimeType.startsWith("image/")) {
    return <img src={url} alt={name} className="max-w-full max-h-full object-contain" />;
  }

  if (mimeType.startsWith("video/")) {
    return (
      <video src={url} controls className="max-w-full max-h-full">
        Your browser does not support video playback.
      </video>
    );
  }

  if (mimeType.startsWith("audio/")) {
    return (
      <audio controls className="w-full">
        <source src={url} type={mimeType} />
      </audio>
    );
  }

  if (mimeType === "application/pdf") {
    return <iframe src={url} className="w-full h-full border-0" title={name} />;
  }

  if (mimeType.startsWith("text/") || mimeType === "application/json" || name.endsWith(".md")) {
    return <TextFilePreview url={url} name={name} />;
  }

  if (
    mimeType.includes("spreadsheet") ||
    mimeType.includes("excel") ||
    mimeType.includes("document") ||
    mimeType.includes("word") ||
    mimeType.includes("presentation") ||
    mimeType.includes("powerpoint") ||
    name.endsWith(".xlsx") ||
    name.endsWith(".xls") ||
    name.endsWith(".docx") ||
    name.endsWith(".doc") ||
    name.endsWith(".pptx") ||
    name.endsWith(".ppt")
  ) {
    return (
      <iframe
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
        className="w-full h-full border-0"
        title={name}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
      <FileText className="w-24 h-24 text-muted-foreground" />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground mt-2">Preview not available for this file type</p>
        <p className="text-xs text-muted-foreground mt-1">{mimeType}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
        <Download className="w-4 h-4" />
        <span>Download to view this file</span>
      </div>
    </div>
  );
}

function TextFilePreview({ url, name }: { url: string; name: string }) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setContent("Failed to load file content");
        setLoading(false);
      });
  }, [url]);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="w-full h-full overflow-auto bg-background p-6">
      <pre className="text-sm font-mono whitespace-pre-wrap break-words">{content}</pre>
    </div>
  );
}
