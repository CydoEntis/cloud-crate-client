import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { useGetFile } from "../../hooks/file/queries/useGetFile";
import { FilePreview } from "./FilePreview";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import DateIndicator from "@/shared/components/DateIndicator";
import { DownloadButton } from "@/shared/components/DownloadButton";
import StorageDisplay from "@/shared/components/StorageDisplay";
import UserAvatar from "@/shared/components/UserAvatar";

type FilePreviewPanelProps = {
  crateId: string;
  fileId: string | null;
  onClose: () => void;
};

export default function FilePreviewPanel({ crateId, fileId, onClose }: FilePreviewPanelProps) {
  const { data: file, isLoading, isError } = useGetFile(crateId, fileId);
  console.log(file);
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
                    url: file.fileUrl!,
                    mimeType: file.mimeType!,
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
                </DialogHeader>

                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex gap-2">
                    <h3>Uploader:</h3>
                    {/* <UserAvatar
                      displayName={file.uploadedByDisplayName ?? ""}
                      email={file.uploadedByEmail ?? ""}
                      profilePictureUrl={file.uploadedByProfilePictureUrl ?? ""}
                    /> */}
                  </div>
                  <div className="flex gap-2">
                    <h3>Upload Date:</h3>
                    <DateIndicator date={new Date(file.createdAt!)} />
                  </div>
                  <div className="flex gap-2">
                    <h3>File Type:</h3>
                    <DialogDescription>{file.mimeType}</DialogDescription>
                  </div>
                  <div className="flex gap-2">
                    <h3>File Size:</h3>
                    <StorageDisplay storage={file.sizeInBytes} />
                  </div>
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
