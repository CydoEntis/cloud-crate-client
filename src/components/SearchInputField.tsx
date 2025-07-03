import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "@react-hookz/web";

type Props = {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  delay?: number;
};

export default function SearchInputField({ value, onChange, label, placeholder = "Search...", delay = 300 }: Props) {
  const [inputValue, setInputValue] = useState(value);

  const debounced = useDebouncedCallback(
    (val: string) => {
      onChange(val);
    },
    [onChange],
    delay
  );

  useEffect(() => {
    debounced(inputValue);
  }, [inputValue, debounced]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="relative w-full max-w-xs">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="pl-9"
          type="text"
          autoComplete="off"
        />
      </div>
    </div>
  );
}
