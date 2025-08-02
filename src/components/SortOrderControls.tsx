import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpNarrowWide, ArrowUpWideNarrow } from "lucide-react";

type SortByType = "Name" | "JoinedAt" | "UsedStorage" | "Owned" | "Joined";
type OrderByType = "Asc" | "Desc";

type SortOrderControlsProps = {
  sortBy: SortByType;
  orderBy: OrderByType;
  allowedSortByValues: SortByType[];
  onSortByChange: (val: SortByType) => void;
  onOrderByChange: (val: OrderByType) => void;
};

export default function SortOrderControls({
  sortBy,
  orderBy,
  allowedSortByValues,
  onSortByChange,
  onOrderByChange,
}: SortOrderControlsProps) {
  return (
    <div className="flex items-end gap-4">
      {/* Sort By */}
      <div className="flex flex-col gap-1">
        <Select value={sortBy} onValueChange={(val) => onSortByChange(val as SortByType)}>
          <SelectTrigger className="w-[160px] border-none shadow-none">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {allowedSortByValues.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort direction */}
      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          className="p-2"
          size="icon"
          onClick={() => {
            onOrderByChange(orderBy === "Asc" ? "Desc" : "Asc");
          }}
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
