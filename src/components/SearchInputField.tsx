import { useCallback, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
};

export default function SearchInputField({ value, onChange, label, placeholder = "Search..." }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className="relative w-full max-w-xs">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pl-9"
          type="text"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
