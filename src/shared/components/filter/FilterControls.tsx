import { Label } from "@/shared/components/ui/label";
import { renderSelectControl, renderSortControl } from "@/shared/utils/filterUtils";
import type { FilterControl, SortConfig } from "@/shared/types/sharedTypes";
import OrderToggle from "./OrderToggle";

type FilterControlsProps<T extends string> = {
  controls: FilterControl[];
  sort?: SortConfig<T>;
  layout: "dialog" | "inline";
};

function FilterControls<T extends string>({ controls, sort, layout }: FilterControlsProps<T>) {
  const selectClassName =
    layout === "dialog"
      ? "w-full"
      : "w-full md:w-auto border-input hover:text-accent-foreground hover:bg-accent text-muted-foreground";
  const sortClassName =
    layout === "dialog"
      ? "w-full"
      : "w-auto border-input hover:text-accent-foreground hover:bg-accent text-muted-foreground";

  if (layout === "dialog") {
    return (
      <div className="space-y-6">
        {controls.map((control) => (
          <div key={control.key}>
            <Label className="text-sm font-medium mb-2 block">{control.label}</Label>
            {control.type === "select" && renderSelectControl(control, selectClassName)}
            {control.type === "tabs" && control.component}
            {control.type === "custom" && control.component}
          </div>
        ))}

        {sort && (
          <div>
            <Label className="text-sm font-medium mb-2 block">Sort</Label>
            <div className="flex gap-2">
              <div className="flex-1">{renderSortControl(sort, sortClassName)}</div>
              <OrderToggle ascending={sort.ascending} onChange={sort.onOrderChange} />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {controls
        .filter((control) => control.type !== "select")
        .map((control) => (
          <div key={control.key} className="w-full md:w-auto md:flex-shrink-0">
            {control.type === "tabs" && control.component}
            {control.type === "custom" && control.component}
          </div>
        ))}

      <div className="flex flex-col gap-2 md:flex-row md:items-end md:gap-2">
        {controls
          .filter((control) => control.type === "select")
          .map((control) => renderSelectControl(control, selectClassName))}

        {sort && (
          <div className="flex gap-2">
            {renderSortControl(sort, sortClassName)}
            <OrderToggle ascending={sort.ascending} onChange={sort.onOrderChange} />
          </div>
        )}
      </div>
    </>
  );
}

export default FilterControls;
