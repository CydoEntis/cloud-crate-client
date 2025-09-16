import type { CrateRole } from "../crate.types";
import DeleteCrate from "./DeleteCrate";
import UpdateCrateForm from "./UpdateCrateForm";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/shared/components/ui/sheet";

type CrateSettingsPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  crateId: string;
  initialName: string;
  initialColor: string;
  role: CrateRole;
};

export default function CrateSettingsPanel({
  isOpen,
  onClose,
  crateId,
  initialName,
  initialColor,
  role,
}: CrateSettingsPanelProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="px-4 py-8 border-none shadow bg-card text-foreground">
        <SheetHeader className="p-0">
          <SheetTitle>Crate Settings</SheetTitle>
          <SheetDescription>Update crate info, manage collaborators, or delete this crate.</SheetDescription>
          <UpdateCrateForm crateId={crateId} initialName={initialName} initialColor={initialColor} />
        </SheetHeader>

        <div className="border-t mt-8 pt-6 space-y-4">
          {/* <InviteCollaborators crateId={crateId} /> */}
          <DeleteCrate crateId={crateId} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
