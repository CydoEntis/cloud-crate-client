import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { FilePreview } from "./FilePreview";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import DateIndicator from "@/shared/components/indicators/DateIndicator";
import { DownloadButton } from "@/shared/components/DownloadButton";
import StorageDisplay from "@/shared/components/indicators/StorageDisplay";
import { useGetFile } from "../api/fileQueries";

type FilePreviewPanelProps = {
  crateId: string;
  fileId: string;
  onClose: () => void;
};

export default function FilePreviewPanel({ crateId, fileId, onClose }: FilePreviewPanelProps) {
  const { data: file, isLoading, isError } = useGetFile(crateId, fileId);

  if (!fileId) return null;

  return (
    <Dialog open={!!fileId} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] lg:max-w-[85vw] max-h-[95vh] sm:max-h-[90vh] p-0 overflow-hidden">
        {isLoading && <div className="p-4">Loading file...</div>}
        {isError && <div className="p-4 text-destructive">Error loading file</div>}

        {file && (
          <div className="flex flex-col lg:flex-row h-[85vh] sm:h-[80vh]">
            <div className="flex-1 flex items-center justify-center bg-card p-4 sm:p-6 min-h-[50vh] lg:min-h-0">
              <div className="w-full h-full max-w-full max-h-full flex items-center justify-center rounded overflow-hidden">
                <FilePreview
                  file={{
                    url: file.fileUrl!,
                    mimeType: file.mimeType!,
                    name: file.name,
                  }}
                />
              </div>
            </div>

            <div className="w-full lg:w-[320px] xl:w-[360px] bg-background flex flex-col border-muted border-t lg:border-t-0 lg:border-l">
              <ScrollArea className="p-4 sm:p-6 flex-1">
                <DialogHeader className="mb-4">
                  <DialogTitle className="break-words text-base sm:text-lg">{file.name}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h3 className="font-medium text-foreground min-w-[100px]">Uploader:</h3>
                    <span className="text-muted-foreground">{file.uploader.displayName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h3 className="font-medium text-foreground min-w-[100px]">Upload Date:</h3>
                    <DateIndicator date={new Date(file.createdAt!)} />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h3 className="font-medium text-foreground min-w-[100px]">File Type:</h3>
                    <DialogDescription className="text-muted-foreground">{file.mimeType}</DialogDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h3 className="font-medium text-foreground min-w-[100px]">File Size:</h3>
                    <StorageDisplay storage={file.sizeInBytes} />
                  </div>
                </div>
              </ScrollArea>

              <div className="p-4 sm:p-6 border-t border-muted">
                <DownloadButton crateId={crateId} fileId={file.id} fileName={file.name} />
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}