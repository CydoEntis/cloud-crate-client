import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";

type SortControlsProps = {
  value: string;
  ascending: boolean;
  options: { value: string; label: string }[];
  onValueChange: (value: string) => void;
  onOrderChange: (ascending: boolean) => void;
  label?: string;
  fullWidth?: boolean;
};

export function SortControls({
  value,
  ascending,
  options,
  onValueChange,
  onOrderChange,
  label,
  fullWidth,
}: SortControlsProps) {
  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : "w-auto"}`}>
      {label && <Label className="text-sm font-medium text-muted-foreground">{label}</Label>}
      <div className="flex gap-2">
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger className={`${fullWidth ? "w-full" : "w-40"} text-muted-foreground cursor-pointer`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-muted">
            {options.map((option) => (
              <SelectItem className="cursor-pointer" key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" onClick={() => onOrderChange(!ascending)}>
          {ascending ? (
            <ArrowUpAZ className="text-muted-foreground" />
          ) : (
            <ArrowDownAZ className="text-muted-foreground" />
          )}
        </Button>
      </div>
    </div>
  );
}
