// CrateSettingsPanel.tsx
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import InviteCollaborators from "@/features/invites/components/InivteCollaborators";
import DeleteCrate from "./DeleteCrate";
import type { CrateRole } from "@/features/invites/types/CrateRole";

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
      <SheetContent side="right" className="px-4 py-8">
        <SheetHeader className="p-0">
          <SheetTitle>Crate Settings</SheetTitle>
          <SheetDescription>Update crate info, manage collaborators, or delete this crate.</SheetDescription>
        </SheetHeader>

        <div className="border-t mt-8 pt-6 space-y-4">
          <InviteCollaborators crateId={crateId} />
          <DeleteCrate crateId={crateId} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
