import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import FilterControls from "./FilterControls";
import type { FilterControl, SortConfig } from "@/shared/types/sharedTypes";

type MobileFilterDialogProps<T extends string> = {
  controls: FilterControl[];
  sort?: SortConfig<T>;
};

function MobileFilterDialog<T extends string>({ controls, sort }: MobileFilterDialogProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-muted text-muted-foreground">
        <DialogHeader>
          <DialogTitle className="text-muted-foreground">Filters</DialogTitle>
        </DialogHeader>
        <FilterControls controls={controls} sort={sort} layout="dialog" />
      </DialogContent>
    </Dialog>
  );
}

export default MobileFilterDialog;
