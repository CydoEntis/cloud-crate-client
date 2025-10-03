import { Plus } from "lucide-react";
import { useCrateModalStore } from "../store/crateModalStore";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface AddCrateButtonProps {
  className?: string;
  iconSize?: number;
  size?: "default" | "sm" | "lg" | "icon";
}

function AddCrateButton({ className, iconSize = 28, size = "default" }: AddCrateButtonProps) {
  const { open } = useCrateModalStore();

  return (
    <Button
      onClick={() => open()}
      size={size}
      className={cn("flex items-center justify-center p-2 cursor-pointer", className)}
    >
      <Plus size={iconSize} />
      <span className="text-sm font-medium">New Crate</span>
    </Button>
  );
}

export default AddCrateButton;
