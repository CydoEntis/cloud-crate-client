import { Trash2, LogOut } from "lucide-react";
import { useCrateSelectionStore } from "../store/crateSelectionStore";

import { Button } from "@/shared/components/ui/button";
import { useBulkDeleteCrates, useBulkLeaveCrates } from "../api/crate.queries";

export default function CrateBulkActionBar() {
  const { selectedIds, clear } = useCrateSelectionStore();
  const bulkDelete = useBulkDeleteCrates();
  const bulkLeave = useBulkLeaveCrates();

  if (selectedIds.size === 0) return null;

  const handleDelete = async () => {
    await bulkDelete.mutateAsync(Array.from(selectedIds));
    clear();
  };

  const handleLeave = async () => {
    await bulkLeave.mutateAsync(Array.from(selectedIds));
    clear();
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-auto text-foreground bg-card border border-input shadow-xl rounded-xl p-4 flex items-center gap-4 z-50">
      <p className="font-semibold">{selectedIds.size} selected</p>

      <Button
        variant="outline"
        onClick={handleLeave}
        className="flex items-center gap-2"
        title="You cannot leave crates you own"
      >
        <LogOut /> Leave
      </Button>

      <Button
        variant="destructive"
        onClick={handleDelete}
        className="flex items-center gap-2"
        title="You cannot delete crates you don't own"
      >
        <Trash2 /> Delete
      </Button>
    </div>
  );
}
