// features/crates/components/ColorPicker.tsx
import { Check } from "lucide-react";
import { useController, type Control } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const colorOptions = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Red", value: "#EF4444" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Purple", value: "#A855F7" },
  { name: "Pink", value: "#EC4899" },
  { name: "Yellow", value: "#FFBC2D" }, 
  { name: "Gray", value: "#374151" },
  { name: "Lime", value: "#6DCC55" },
  { name: "Orange", value: "#FF6600" }, 
];

type ColorPickerProps = {
  control: Control<any>;
  name: string;
};

export function ColorPicker({ control, name }: ColorPickerProps) {
  const {
    field: { value, onChange },
  } = useController({ control, name });

  useEffect(() => {
    if (!value) {
      onChange(colorOptions[0].value);
    }
  }, [value, onChange]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Color</label>
      <div className="flex items-center overflow-x-auto">
        {colorOptions.map((color) => {
          const selected = value === color.value;
          return (
            <div
              key={color.value}
              className={cn(
                "rounded-md p-[2px] border-2 transition-all cursor-pointer",
                selected ? "" : "border-transparent"
              )}
              style={{ borderColor: selected ? color.value : "transparent" }}
            >
              <button
                type="button"
                onClick={() => onChange(color.value)}
                className="w-6 h-6 min-w-[1.5rem] min-h-[1.5rem] rounded-sm flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: color.value }}
                aria-label={color.name}
                title={color.name}
              >
                {/* Always render Check for consistent layout */}
                <Check
                  className={cn("transition-opacity text-white", selected ? "opacity-100" : "opacity-0")}
                  size={14}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
