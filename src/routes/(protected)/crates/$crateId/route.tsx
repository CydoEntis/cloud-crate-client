import { createFileRoute, Outlet } from "@tanstack/react-router";
import AvailableStorageIndicator from "@/features/storage/components/AvailableStorageIndicator";
import { useCrateDetails } from "@/features/crates/hooks/queries/useCrateDetails";
import FileUpload from "@/features/folder-contents/components/file/FileUpload";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CrateSettingsPanel from "@/features/crates/components/CrateSettingsPanel";
import { CrateRole } from "@/features/invites/types/CrateRole";
import { useFolderModalStore } from "@/features/folder-contents/store/useFolderModalStore";
import { CreateFolderModal } from "@/features/folder-contents/components/folder";

export const Route = createFileRoute("/(protected)/crates/$crateId")({
  component: CrateLayout,
});

function CrateLayout() {
  const { crateId } = Route.useParams();
  const { data: crate, isLoading, isError } = useCrateDetails(crateId);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const { isOpen, close } = useFolderModalStore();

  if (isLoading) return <p>Loading crate info...</p>;
  if (isError || !crate) return <p>Failed to load crate info</p>;

  return (
    <section className="p-4">
      <div className="flex justify-between items-center  py-2">
        <h3 className="text-3xl font-bold text-foreground">{crate.name}</h3>
        {crate.role !== CrateRole.Viewer ? (
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/30 cursor-pointer hover:text-primary"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings /> Settings
          </Button>
        ) : null}
      </div>

      <div className="mb-4">
        <AvailableStorageIndicator crate={crate} />
        <FileUpload crateId={crateId} />
      </div>

      <CrateSettingsPanel
        role={crate.role}
        isOpen={isSettingsOpen}
        onClose={() => setSettingsOpen(false)}
        crateId={crateId}
        initialName={crate.name}
        initialColor={crate.color}
      />

      <Outlet />
      <CreateFolderModal isOpen={isOpen} onClose={close} crateId={crateId} />
    </section>
  );
}
