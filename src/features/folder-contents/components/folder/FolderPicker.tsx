import { Button } from "@/components/ui/button";
import type { Folder } from "../types/Folder";

type FolderPickerProps = {
  folders: Folder[];
  currentFolderId: string;
  onSelect: (folderId: string) => void;
};

function FolderPicker({ folders, currentFolderId, onSelect }: FolderPickerProps) {
  return (
    <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
      {folders.map((folder) => (
        <Button
          key={folder.id}
          variant="outline"
          disabled={folder.id === currentFolderId}
          onClick={() => onSelect(folder.id)}
        >
          {folder.name}
        </Button>
      ))}
    </div>
  );
}

export default FolderPicker;
