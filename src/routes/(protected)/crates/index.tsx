import { useState } from "react";
import CrateTable from "@/features/crates/components/CrateTable";
import { crateTableColumns } from "@/features/crates/components/crateTableColumns";
import { useGetUserCrates } from "@/features/crates/hooks/queries/useGetUserCrates";
import { createFileRoute } from "@tanstack/react-router";
import UpdateCrateModal from "@/features/crates/components/UpdateCrateModal";
import type { Crate } from "@/features/crates/types/Crate";

export const Route = createFileRoute("/(protected)/crates/")({
  component: CratesPage,
});

function CratesPage() {
  const { data, isLoading } = useGetUserCrates();
  const [editingCrate, setEditingCrate] = useState<Crate | null>(null);

  const handleEdit = (crate: Crate) => {
    setEditingCrate(crate);
  };

  const handleClose = () => {
    setEditingCrate(null);
  };

  if (isLoading) return <p>Loading crates...</p>;

  return (
    <div className="space-y-12 p-6">
      <section>
        <h2 className="text-xl font-semibold mb-4">My Crates</h2>
        <CrateTable
          data={data ?? []}
          columns={crateTableColumns({
            onEdit: handleEdit,
            onDelete: (crate) => console.log("delete", crate.id),
            onLeave: (crate) => console.log("leave", crate.id),
          })}
        />
      </section>

      {editingCrate && (
        <UpdateCrateModal
          open={!!editingCrate}
          onOpenChange={(open) => {
            if (!open) handleClose();
          }}
          crateId={editingCrate.id}
          initialName={editingCrate.name}
          initialColor={editingCrate.color}
        />
      )}
    </div>
  );
}
