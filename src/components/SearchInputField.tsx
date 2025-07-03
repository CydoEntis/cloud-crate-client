import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "@react-hookz/web";

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  onDebouncedChange: (value: string) => void;
  delay?: number;
};

export default function SearchInputField({
  name,
  label,
  placeholder = "Search...",
  onDebouncedChange,
  delay = 300,
}: Props) {
  const { control } = useFormContext();
  const value = useWatch({ name, control });

  const debounced = useDebouncedCallback(onDebouncedChange, [onDebouncedChange], delay);

  useEffect(() => {
    debounced(value);
  }, [value, debounced]);

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="relative w-full max-w-xs">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
              <Input {...field} placeholder={placeholder} className="pl-9" type="text" autoComplete="off" />
            </>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
