import { LogOut } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

import { useUserStore } from "@/features/user/user.store";
import GetMoreStorage from "@/shared/components/GetMoreStorage";
import CurrentUserDisplay from "@/features/user/components/CurrentUserDisplay";
import { useLogout } from "@/features/auth/api/auth.queries";

export function SidebarUserSection() {
  const user = useUserStore((state) => state.user);
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="pb-6 px-4 space-y-4">
      <GetMoreStorage user={user} />
      <div className="border-t border-secondary pt-4 flex justify-between items-center">
        <CurrentUserDisplay user={user} />
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
  );
}
