import { createFileRoute, Outlet } from "@tanstack/react-router";
import AvailableStorageIndicator from "@/features/storage/components/AvailableStorageIndicator";
import { useCrateDetails } from "@/features/crates/hooks/queries/useCrateDetails";
import FileUpload from "@/features/files/components/FileUpload";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CrateSettingsPanel from "@/features/crates/components/CrateSettingsPanel";
import { CrateRole } from "@/features/invites/types/CrateRole";

export const Route = createFileRoute("/(protected)/crates/$crateId")({
  component: CrateLayout,
});

function CrateLayout() {
  const { crateId } = Route.useParams();
  const { data: crate, isLoading, isError } = useCrateDetails(crateId);
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  if (isLoading) return <p>Loading crate info...</p>;
  if (isError || !crate) return <p>Failed to load crate info</p>;

  return (
    <section>
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <h3 className="text-3xl font-bold">{crate.name}</h3>
        {crate.role !== CrateRole.Viewer ? (
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-purple-50 cursor-pointer hover:text-primary"
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
    </section>
  );
}
