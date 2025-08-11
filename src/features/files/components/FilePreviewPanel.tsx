import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useGetFile } from "../hooks/queries/useGetFile";
import { FilePreview } from "./FilePreview";

type FilePreviewPanelProps = {
  crateId: string;
  fileId: string | null;
  onClose: () => void;
};

export default function FilePreviewPanel({ crateId, fileId, onClose }: FilePreviewPanelProps) {
  const { data: file, isLoading, error } = useGetFile(crateId, fileId);
  console.log("AAAAAAAAAA: ", file);
  if (!fileId) return null;

  return (
    <Sheet open={!!fileId} onOpenChange={onClose}>
      <SheetContent side="right" className="px-4 py-8 border-none shadow bg-card text-foreground">
        {isLoading && <div className="p-4">Loading file...</div>}
        {error && <div className="p-4 text-red-500">Error loading file</div>}

        {file && (
          <>
            <SheetHeader className="p-0">
              <SheetTitle>{file.name}</SheetTitle>
              <SheetDescription>{file.mimeType}</SheetDescription>
            </SheetHeader>

            <div className="mt-4">
              <FilePreview
                file={{
                  url: file.fileUrl,
                  mimeType: file.mimeType,
                  name: file.name,
                }}
              />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
