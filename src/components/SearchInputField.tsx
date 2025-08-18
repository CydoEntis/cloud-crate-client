import { useCallback, useRef, useEffect } from "react";
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
    <div className="relative w-full max-w-[800px] bg-input rounded-xl">
      {label && <label className="block mb-2 text-lg font-semibold">{label}</label>}
      <div className="relative h-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground w-5 h-5 pointer-events-none" />{" "}
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          type="text"
          autoComplete="off"
          className="border-none pl-12 h-full  rounded-lg py-3 text-foreground 
             focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}
