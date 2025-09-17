import { useDownloadFile } from "@/features/folder-contents/file/api/fileQueries";
import { Button } from "./ui/button";

export function DownloadButton({ crateId, fileId, fileName }: { crateId: string; fileId: string; fileName: string }) {
  const downloadMutation = useDownloadFile();

  const handleDownload = async () => {
    const blob = await downloadMutation.mutateAsync({ crateId, fileId });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button className="w-full" onClick={handleDownload} disabled={downloadMutation.isPending}>
      {downloadMutation.isPending ? "Downloading..." : "Download"}
    </Button>
  );
}
