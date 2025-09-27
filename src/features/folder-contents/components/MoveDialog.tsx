import { useState, useMemo, useEffect } from "react";
import { Folder, File, Home, Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog";

import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { useGetAvailableMoveTargets } from "../folder/api/folderQueries";
import { useMoveFile } from "../file/api/fileQueries";
import { useMoveFolder } from "../folder/api/folderQueries";
import type { FolderContentRowItem } from "../sharedTypes";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";

interface MoveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: FolderContentRowItem | null;
  currentFolderId?: string | null;
  crateId: string;
}

function MoveDialog({ isOpen, onClose, item, currentFolderId, crateId }: MoveDialogProps) {
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [selectedDestinationName, setSelectedDestinationName] = useState<string>("");
  const [commandOpen, setCommandOpen] = useState(false);

  const excludeFolderId = item?.isFolder ? item.id : undefined;
  const { data: availableFolders = [], isLoading } = useGetAvailableMoveTargets(crateId, excludeFolderId);

  const moveFileMutation = useMoveFile();
  const moveFolderMutation = useMoveFolder();

  const currentLocationId = currentFolderId || "root";
  const filteredFolders = useMemo(
    () =>
      availableFolders.filter((folder) => folder.id !== currentLocationId).sort((a, b) => a.name.localeCompare(b.name)),
    [availableFolders, currentLocationId]
  );

  const showRootOption = currentLocationId !== "root";

  const searchableOptions = useMemo(() => {
    const options: Array<{
      id: string;
      name: string;
      searchText: string;
      icon: typeof Home | typeof Folder;
    }> = [];

    if (showRootOption) {
      options.push({
        id: "root",
        name: "Root Folder",
        searchText: "root folder home",
        icon: Home,
      });
    }

    filteredFolders.forEach((folder) => {
      options.push({
        id: folder.id,
        name: folder.name,
        searchText: folder.name.toLowerCase(),
        icon: Folder,
      });
    });

    return options;
  }, [showRootOption, filteredFolders]);

  useEffect(() => {
    if (isOpen) {
      setSelectedDestinationId(null);
      setSelectedDestinationName("");
    }
  }, [isOpen]);

  const handleSelectDestination = (optionId: string, optionName: string) => {
    setSelectedDestinationId(optionId);
    setSelectedDestinationName(optionName);
    setCommandOpen(false);
  };

  const handleClearSelection = () => {
    setSelectedDestinationId(null);
    setSelectedDestinationName("");
  };

  const handleMove = async () => {
    if (!item || !selectedDestinationId) return;

    const targetFolderId = selectedDestinationId === "root" ? null : selectedDestinationId;

    try {
      if (item.isFolder) {
        await moveFolderMutation.mutateAsync({
          crateId,
          folderId: item.id,
          moveData: {
            newParentFolderId: targetFolderId,
          },
        });
      } else {
        await moveFileMutation.mutateAsync({
          crateId,
          fileId: item.id,
          moveData: {
            newParentId: targetFolderId,
          },
        });
      }
      onClose();
    } catch (error) {
      console.error("Move failed:", error);
    }
  };

  const isMoving = moveFileMutation.isPending || moveFolderMutation.isPending;
  const canMove = item !== null && selectedDestinationId !== null;

  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {item.isFolder ? <Folder size={20} /> : <File size={20} />}
            Move "{item.name}"
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current item info */}
          <div className="p-3 bg-accent/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Moving:</span>
              <Badge variant="secondary" className="flex items-center gap-1">
                {item.isFolder ? <Folder size={12} /> : <File size={12} />}
                {item.name}
              </Badge>
            </div>
          </div>

          {/* Destination selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Choose destination:</label>

            <Popover open={commandOpen} onOpenChange={setCommandOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={commandOpen}
                  className="w-full justify-between h-auto min-h-[40px] p-3"
                  disabled={isLoading || isMoving}
                >
                  {selectedDestinationName ? (
                    <div className="flex items-center gap-2">
                      {selectedDestinationId === "root" ? (
                        <Home size={16} className="text-primary" />
                      ) : (
                        <Folder size={16} className="text-primary" />
                      )}
                      <span className="truncate">{selectedDestinationName}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto h-4 w-4 p-0 hover:bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClearSelection();
                        }}
                      >
                        <X size={12} />
                      </Button>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Select destination folder...</span>
                  )}
                  <Search size={16} className="ml-2 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command >
                  <CommandInput placeholder="Search folders..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>{isLoading ? "Loading folders..." : "No folders found"}</CommandEmpty>
                    <CommandGroup>
                      {searchableOptions.map((option) => {
                        const IconComponent = option.icon;
                        return (
                          <CommandItem
                            key={option.id}
                            value={option.searchText}
                            onSelect={() => handleSelectDestination(option.id, option.name)}
                          >
                            <div className="flex items-center gap-2">
                              <IconComponent size={16} className="text-primary" />
                              <span>{option.name}</span>
                            </div>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {isLoading && <p className="text-xs text-muted-foreground">Loading folders...</p>}

            {searchableOptions.length === 0 && !isLoading && (
              <p className="text-xs text-muted-foreground">No other folders available</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isMoving}>
            Cancel
          </Button>
          <Button onClick={handleMove} disabled={!canMove || isMoving} className="min-w-[80px]">
            {isMoving ? "Moving..." : "Move"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MoveDialog;
