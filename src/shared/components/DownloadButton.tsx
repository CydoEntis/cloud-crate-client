import { useDownloadFile } from "@/features/folder-contents/file/api/fileQueries";
import { Button } from "./ui/button";

export function DownloadButton({ crateId, fileId, fileName }: { crateId: string; fileId: string; fileName: string }) {
  const downloadMutation = useDownloadFile();

  const handleDownload = () => {
    downloadMutation.mutate({ crateId, fileId, fileName });
  };

  return (
    <Button className="w-full" onClick={handleDownload} disabled={downloadMutation.isPending}>
      {downloadMutation.isPending ? "Downloading..." : "Download"}
    </Button>
  );
}
