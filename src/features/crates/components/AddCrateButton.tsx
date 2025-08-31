import { SidebarMenuItem } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCrateModalStore } from "../store/crateModalStore";
import { useUserStore } from "@/features/auth";

function AddCrateButton() {
  const { open } = useCrateModalStore();

  return (
    <SidebarMenuItem className="mx-4">
      <Button onClick={open} className="w-full flex items-center justify-center  p-2 cursor-pointer">
        <Plus size={28} />
        <span className="text-sm font-medium">New Crate</span>
      </Button>
    </SidebarMenuItem>
  );
}

export default AddCrateButton;
