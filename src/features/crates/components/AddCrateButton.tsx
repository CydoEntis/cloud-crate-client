import { SidebarMenuItem } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCrateModalStore } from "../crateModalStore";
import { useUserStore } from "@/features/auth/userStore";

export function AddCrateButton() {
  const { open } = useCrateModalStore();
  const { user } = useUserStore();

  const canAddCrate = (user?.crateCount ?? 0) < (user?.crateLimit ?? 1);

  if (!canAddCrate) return null;

  return (
    <SidebarMenuItem className="mx-4">
      <Button
        onClick={open}
        variant="ghost"
        className="w-full flex items-center justify-center border border-dashed border-gray-300 text-gray-400 hover:border-primary hover:text-primary hover:bg-indigo-50 p-2 cursor-pointer"
      >
        <Plus size={28} />
        <span className="text-sm font-medium">New Crate</span>
      </Button>
    </SidebarMenuItem>
  );
}
