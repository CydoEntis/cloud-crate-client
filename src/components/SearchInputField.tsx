import { useCallback, useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  delay?: number;
};

export default function SearchInputField({
  value,
  onChange,
  label,
  placeholder = "Search...",
  delay = 500,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
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
    <div className="relative w-full max-w-[800px] bg-card rounded-xl">
      {label && <label className="block mb-2 text-lg font-semibold">{label}</label>}
      <div className="relative h-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground w-5 h-5 pointer-events-none" />
        <Input
          ref={inputRef}
          value={internalValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          type="text"
          autoComplete="off"
          className="border-input pl-12 h-full rounded-lg py-3 text-foreground 
             focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}
