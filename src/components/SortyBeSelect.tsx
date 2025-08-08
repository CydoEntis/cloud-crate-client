import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

type SortBySelectProps<T extends string> = {
  value: T;
  allowedValues: readonly T[];
  labels: Record<T, string>;
  label?: string;
  onChange: (val: T) => void;
};

export default function SortBySelect<T extends string>({
  value,
  allowedValues,
  labels,
  label,
  onChange,
}: SortBySelectProps<T>) {
  return (
    <div className="flex flex-col gap-1 bg-input rounded-xl">
      {label && <span className="text-sm text-muted-foreground px-1">{label}</span>}
      <Select value={value} onValueChange={(val) => onChange(val as T)}>
        <SelectTrigger className="w-[160px] border-none bg-input text-foreground">
          <SelectValue>{labels[value]}</SelectValue>
        </SelectTrigger>
        <SelectContent className="border-none shadow-md rounded-xl bg-card">
          {allowedValues.map((val) => (
            <SelectItem key={val} value={val}>
              {labels[val]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
