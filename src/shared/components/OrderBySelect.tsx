import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type OrderBySelectProps<T extends string> = {
  value: T;
  allowedValues: readonly T[];
  labels: Record<T, string>;
  label?: string;
  onChange: (val: T) => void;
};

function OrderBySelect<T extends string>({ value, allowedValues, labels, label, onChange }: OrderBySelectProps<T>) {
  return (
    <div className="flex flex-col gap-1 rounded-md">
      {label && <span className="text-sm text-muted-foreground px-1">{label}</span>}
      <Select value={value} onValueChange={(val) => onChange(val as T)}>
        <SelectTrigger className="w-[160px]  border-input hover:text-accent-foreground hover:bg-accent text-foreground">
          <SelectValue>{labels[value]}</SelectValue>
        </SelectTrigger>
        <SelectContent className="shadow-md rounded-md  border-input">
          {allowedValues.map((val) => (
            <SelectItem key={val} value={val} className="hover:bg-accent">
              {labels[val]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default OrderBySelect;
