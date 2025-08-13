import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetFile } from "../hooks/queries/useGetFile";
import { FilePreview } from "./FilePreview";
import { DownloadButton } from "@/components/DownloadButton";

type FilePreviewPanelProps = {
  crateId: string;
  fileId: string | null;
  onClose: () => void;
};

export default function FilePreviewPanel({ crateId, fileId, onClose }: FilePreviewPanelProps) {
  const { data: file, isLoading, isError } = useGetFile(crateId, fileId);

  if (!fileId) return null;

  return (
    <Dialog open={!!fileId} onOpenChange={onClose}>
      <DialogContent className="!max-w-[90vw] !max-h-[90vh] p-0 overflow-hidden border-none shadow-none text-foreground">
        {isLoading && <div className="p-4">Loading file...</div>}
        {isError && <div className="p-4 text-red-500">Error loading file</div>}

        {file && (
          <div className="flex h-[80vh]">
            {/* File Preview Section */}
            <div className="flex-1 flex items-center justify-center bg-card">
              <div className="w-[80%] h-[80%] flex items-center justify-center rounded overflow-hidden">
                <FilePreview
                  file={{
                    url: file.fileUrl,
                    mimeType: file.mimeType,
                    name: file.name,
                  }}
                />
              </div>
            </div>

            {/* Info Sidebar */}
            <div className="w-[300px] bg-background flex flex-col text-foreground">
              <ScrollArea className="p-4 flex-1">
                <DialogHeader className="p-0 mb-4">
                  <DialogTitle className="break-words">{file.name}</DialogTitle>
                  <DialogDescription>{file.mimeType}</DialogDescription>
                </DialogHeader>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Size: {(file.size / 1024).toFixed(1)} KB</p>
                  {file.lastModified && <p>Last modified: {new Date(file.lastModified).toLocaleString()}</p>}
                </div>
              </ScrollArea>

              {/* Actions */}
              <div className="p-4">
                <DownloadButton crateId={crateId} fileId={file.id} fileName={file.name} />
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
