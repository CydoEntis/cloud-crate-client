import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type SortBy = "Name" | "CreatedAt" | "SizeInBytes";
type OrderBy = "Asc" | "Desc";

type Props = {
  search: string;
  onSearchChange: (val: string) => void;

  sortBy: SortBy;
  onSortByChange: (val: SortBy) => void;

  orderBy: OrderBy;
  onOrderByChange: (val: OrderBy) => void;

  searchSubfolders: boolean;
  onToggleSearchSubfolders: (val: boolean) => void;

  onOpenCreateFolder: () => void;

  allowedSortByValues: readonly SortBy[];
};

export default function FileTableToolbar({
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
  searchSubfolders,
  onToggleSearchSubfolders,
  onOpenCreateFolder,
  allowedSortByValues,
}: Props) {
  const switchId = useId();
  const selectId = useId();

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search files & folders..."
          className="w-full md:w-80"
        />

        <div className="flex items-center gap-2">
          <Label htmlFor={selectId} className="text-sm">
            Sort by
          </Label>
          <select
            id={selectId}
            className="border rounded-md px-2 py-1 text-sm bg-background"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as SortBy)}
          >
            {allowedSortByValues.map((v) => (
              <option key={v} value={v}>
                {v === "SizeInBytes" ? "Size" : v}
              </option>
            ))}
          </select>

          <Button
            type="button"
            variant="outline"
            onClick={() => onOrderByChange(orderBy === "Asc" ? "Desc" : "Asc")}
            className="h-8"
            title={orderBy === "Asc" ? "Ascending" : "Descending"}
          >
            {orderBy === "Asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Switch id={switchId} checked={searchSubfolders} onCheckedChange={onToggleSearchSubfolders} />
          <Label htmlFor={switchId} className="text-sm">
            Search in subfolders
          </Label>
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
