import { Button } from "@/components/ui/button";
import { useDownloadFile } from "@/features/files/hooks/mutations/useDownloadFile";

export function DownloadButton({ crateId, fileId, fileName }: { crateId: string; fileId: string; fileName: string }) {
  const downloadMutation = useDownloadFile();

  const handleDownload = async () => {
    const blob = await downloadMutation.mutateAsync({ crateId, fileId });

    // Create a temporary link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Button className="w-full" onClick={handleDownload} disabled={downloadMutation.isPending}>
      {downloadMutation.isPending ? "Downloading..." : "Download"}
    </Button>
  );
}
