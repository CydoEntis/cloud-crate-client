import { Plus } from "lucide-react";
import SearchInputField from "@/shared/components/SearchInputField";
import OrderToggle from "@/shared/components/OrderToggle";
import OrderBySelect from "@/shared/components/OrderBySelect";
import { Button } from "@/shared/components/ui/button";

export type OrderBy = "Name" | "CreatedAt" | "Size";

const orderByLabels: Record<OrderBy, string> = {
  Name: "File Name",
  CreatedAt: "Created Date",
  Size: "Size",
};

export type FolderContentsFiltersProps = {
  search: string;
  onSearchChange: (val: string) => void;
  orderBy: OrderBy;
  onOrderByChange: (val: OrderBy) => void;
  ascending: boolean;
  onAscendingChange: (val: boolean) => void;
  onOpenCreateFolder: () => void;
  allowedOrderByValues: readonly OrderBy[];
};

function FolderContentsFilters({
  search,
  onSearchChange,
  orderBy,
  onOrderByChange,
  ascending,
  onAscendingChange,
  onOpenCreateFolder,
  allowedOrderByValues,
}: FolderContentsFiltersProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <SearchInputField 
          value={search} 
          onChange={onSearchChange} 
          placeholder="Search files & folders..." 
        />
        <div className="flex items-center gap-2">
          <OrderBySelect
            value={orderBy}
            onChange={onOrderByChange}
            allowedValues={allowedOrderByValues}
            labels={orderByLabels}
          />
          <OrderToggle 
            ascending={ascending} 
            onChange={onAscendingChange} 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button onClick={onOpenCreateFolder}>
          <Plus className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </div>
    </div>
  );
}

export default FolderContentsFilters;