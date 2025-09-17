// features/folder-contents/components/FolderPageHeader.tsx
import { useState, useCallback } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useCrateDetails } from "@/features/crates/api/crateQueries";
import { CrateRole } from "@/features/crates/crateTypes";
import { useParams } from "@tanstack/react-router";

function FolderContentsPageHeader() {
  const { crateId } = useParams({ from: "/(protected)/crates/$crateId/folders/$folderId" });
  const { data: crate } = useCrateDetails(crateId);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const handleOpenSettings = useCallback(() => {
    setSettingsOpen(true);
  }, []);

  const handleCloseSettings = useCallback(() => {
    setSettingsOpen(false);
  }, []);

  const canManage = crate?.role !== CrateRole.Viewer;

  if (!crate) return null;

  return (
    <>
      <div className="flex justify-between items-center py-2">
        <h1 className="text-3xl font-bold text-foreground">{crate.name}</h1>
        {canManage && (
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/30 cursor-pointer hover:text-primary"
            onClick={handleOpenSettings}
          >
            <Settings /> Settings
          </Button>
        )}
      </div>

      {/* <CrateSettingsPanel
        role={crate.role}
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        crateId={crateId}
        initialName={crate.name}
        initialColor={crate.color}
      /> */}
    </>
  );
}

export default FolderContentsPageHeader;