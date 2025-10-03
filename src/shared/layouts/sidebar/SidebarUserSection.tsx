// src/shared/components/sidebar/SidebarUserSection.tsx
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useUserStore } from "@/features/user/userStore";
import UpgradeAccountStorage from "@/features/user/components/UpgradeAccountStorage";
import { useLogout } from "@/features/auth/api/authQueries";
import AuthenticatedUserDisplay from "@/features/user/components/AuthenticatedUserDisplay";
import UserSettingsModal from "@/features/user/components/UserSettingsModal";

export function SidebarUserSection() {
  const user = useUserStore((state) => state.user);
  const { mutate: logout, isPending } = useLogout();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleUpgrade = () => {
    throw new Error("Not implemented");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="pb-6 px-4 space-y-4">
        <UpgradeAccountStorage onUpgradeClick={handleUpgrade} />
        <div className="border-t border-secondary pt-4 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => setIsSettingsOpen(true)}>
            <AuthenticatedUserDisplay />
          </div>
          <Button
            onClick={handleLogout}
            disabled={isPending}
            className="p-2 hover:bg-accent hover:text-accent-foreground text-muted-foreground"
            variant="ghost"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <UserSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
