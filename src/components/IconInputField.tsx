import { Input } from "@/shared/components/ui/input";
import type { LucideIcon } from "lucide-react";
import { useCallback, useRef, useEffect, useState } from "react";

type IconInputProps = {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  delay?: number;
  icon?: LucideIcon;
  type?: "text" | "email" | "password";
};

export default function IconInputField({
  value,
  onChange,
  label,
  placeholder = "Enter value...",
  delay = 500,
  icon: Icon,
  type = "text",
}: IconInputProps) {
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
    <div className="relative w-full max-w-[800px] bg-background rounded-md">
      {label && <label className="block mb-2 text-lg font-semibold">{label}</label>}
      <div className="relative h-9">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground w-4 h-4 pointer-events-none" />
        )}
        <Input
          ref={inputRef}
          value={internalValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          type={type}
          autoComplete="off"
          className={`border-input h-full rounded-lg py-3 text-foreground  
             focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 ${Icon ? "pl-12" : "pl-4"}`}
        />
      </div>
    </div>
  );
}
