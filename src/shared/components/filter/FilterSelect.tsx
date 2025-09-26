import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type FilterSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  label?: string;
  fullWidth?: boolean;
};

export function FilterSelect({ value, onChange, options, placeholder, label, fullWidth }: FilterSelectProps) {
  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : "w-auto"}`}>
      {label && <Label className="text-sm font-medium text-muted-foreground">{label}</Label>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`${fullWidth ? "w-full" : "w-40"} text-muted-foreground cursor-pointer`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="border-muted">
          {options.map((option) => (
            <SelectItem className="cursor-pointer" key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
