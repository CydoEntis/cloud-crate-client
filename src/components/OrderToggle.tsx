import { Button } from "@/components/ui/button";
import { ArrowUpNarrowWide, ArrowUpWideNarrow } from "lucide-react";

type OrderByType = "Asc" | "Desc";

type OrderToggleProps = {
  value: OrderByType;
  onChange: (val: OrderByType) => void;
  label?: string;
};

export default function OrderToggle({ value, onChange, label }: OrderToggleProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-sm text-muted-foreground px-1">{label}</span>}
      <Button
        variant="secondary"
        className="p-2 cursor-pointer rounded-xl"
        size="icon"
        onClick={() => onChange(value === "Asc" ? "Desc" : "Asc")}
        aria-label={`Sort order: ${value === "Asc" ? "Ascending" : "Descending"}`}
      >
        {value === "Asc" ? (
          <ArrowUpWideNarrow className="w-6 h-6 text-muted-foreground" />
        ) : (
          <ArrowUpNarrowWide className="w-6 h-6 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}
