import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";

import SearchInputField from "@/components/SearchInputField";
import SortBySelect from "@/components/SortyBySelect";
import OrderToggle from "@/components/OrderToggle";

type SortBy = "Name" | "CreatedAt" | "Size";
type OrderBy = "Asc" | "Desc";

type Props = {
  search: string;
  onSearchChange: (val: string) => void;

  sortBy: SortBy;
  onSortByChange: (val: SortBy) => void;

  orderBy: OrderBy;
  onOrderByChange: (val: OrderBy) => void;

  onOpenCreateFolder: () => void;

  allowedSortByValues: readonly SortBy[];
};

const sortByLabels: Record<SortBy, string> = {
  Name: "File Name",
  CreatedAt: "Created Date",
  Size: "Size",
};

export default function FileTableToolbar({
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
  onOpenCreateFolder,
  allowedSortByValues,
}: Props) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <SearchInputField value={search} onChange={onSearchChange} placeholder="Search files & folders..." />

        <div className="flex items-center gap-2">
          <SortBySelect
            value={sortBy}
            onChange={onSortByChange}
            allowedValues={allowedSortByValues}
            labels={sortByLabels}
          />
          <OrderToggle value={orderBy} onChange={onOrderByChange} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={onOpenCreateFolder}>
          <Plus className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </div>
    </div>
  );
}
