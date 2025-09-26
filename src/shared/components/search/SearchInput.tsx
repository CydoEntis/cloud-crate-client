import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
};

export function SearchInput({ value, onChange, placeholder, label }: SearchInputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <Label className="text-sm font-medium text-muted-foreground">{label}</Label>}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pl-9 border-muted max-w-[600px]"
        />
      </div>
    </div>
  );
}
