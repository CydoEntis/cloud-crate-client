import { ArrowDownNarrowWide, ArrowUpWideNarrow } from "lucide-react";
import { Button } from "../ui/button";

type OrderToggleProps = {
  ascending: boolean;
  onChange: (val: boolean) => void;
  label?: string;
};

export default function OrderToggle({ ascending, onChange, label }: OrderToggleProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-sm text-muted-foreground px-1">{label}</span>}
      <Button
        variant="outline"
        className="p-2 cursor-pointer rounded-md border-input"
        size="icon"
        onClick={() => onChange(!ascending)}
        aria-label={`Sort order: ${ascending ? "Ascending" : "Descending"}`}
      >
        {ascending ? (
          <ArrowUpWideNarrow className="w-6 h-6 text-muted-foreground" />
        ) : (
          <ArrowDownNarrowWide className="w-6 h-6 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}
