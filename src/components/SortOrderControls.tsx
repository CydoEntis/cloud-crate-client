import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpNarrowWide, ArrowUpWideNarrow } from "lucide-react";

type SortByType = string; // now generic
type OrderByType = "Asc" | "Desc";

type SortOrderControlsProps = {
  sortBy: SortByType;
  orderBy: OrderByType;
  allowedSortByValues: readonly SortByType[];
  sortByLabels: Record<SortByType, string>;
  onSortByChange: (val: SortByType) => void;
  onOrderByChange: (val: OrderByType) => void;
};

export default function SortOrderControls({
  sortBy,
  orderBy,
  allowedSortByValues,
  sortByLabels,
  onSortByChange,
  onOrderByChange,
}: SortOrderControlsProps) {
  return (
    <div className="flex items-end gap-4">
      {/* Sort By */}
      <div className="flex flex-col gap-1">
        <Select value={sortBy} onValueChange={(val) => onSortByChange(val as SortByType)}>
          <SelectTrigger className="w-[160px] border-none bg-input text-foreground">
            <SelectValue placeholder="Sort By">{sortByLabels[sortBy]}</SelectValue>
          </SelectTrigger>
          <SelectContent className="border-none shadow-md">
            {allowedSortByValues.map((value) => (
              <SelectItem key={value} value={value}>
                {sortByLabels[value]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort Direction */}
      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          className="p-2 cursor-pointer"
          size="icon"
          onClick={() => onOrderByChange(orderBy === "Asc" ? "Desc" : "Asc")}
          aria-label={`Sort order: ${orderBy === "Asc" ? "Ascending" : "Descending"}`}
        >
          {orderBy === "Asc" ? (
            <ArrowUpWideNarrow className="w-6 h-6 text-muted-foreground" />
          ) : (
            <ArrowUpNarrowWide className="w-6 h-6 text-muted-foreground" />
          )}
        </Button>
      </div>
    </div>
  );
}
