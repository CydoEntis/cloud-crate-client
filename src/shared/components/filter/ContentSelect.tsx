import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type ContentSelectProps<T extends string> = {
  value: T;
  allowedValues: readonly T[];
  labels: Record<T, string>;
  label?: string;
  placeholder?: string;
  onChange: (val: T) => void;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

function ContentSelect<T extends string>({
  value,
  allowedValues,
  labels,
  label,
  placeholder,
  onChange,
  className = "flex flex-col gap-1 rounded-md",
  triggerClassName = "w-full md:w-auto border-input hover:text-accent-foreground hover:bg-accent text-foreground",
  contentClassName = "shadow-md rounded-md border-input",
}: ContentSelectProps<T>) {
  return (
    <div className={className}>
      {label && <span className="text-sm text-muted-foreground px-1">{label}</span>}
      <Select value={value} onValueChange={(val) => onChange(val as T)}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder}>{labels[value]}</SelectValue>
        </SelectTrigger>
        <SelectContent className={contentClassName}>
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

export default ContentSelect;
