import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useCallback, useRef, useEffect, useState } from "react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label?: string;
  delay?: number;
};

export function SearchInput({ value, onChange, placeholder, label, delay = 300 }: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(value);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = e.target.value;
      setInternalValue(newVal);

      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        onChange(newVal);
      }, delay);
    },
    [onChange, delay]
  );

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && <Label className="text-sm font-medium text-muted-foreground">{label}</Label>}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={internalValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pl-9 border-muted max-w-[600px]"
        />
      </div>
    </div>
  );
}
