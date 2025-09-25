import ContentSelect from "../components/filter/ContentSelect";
import type { FilterControl, SortConfig } from "../types/sharedTypes";

export const renderSelectControl = (control: FilterControl, className?: string) => {
  if (control.type !== "select") return null;

  let allowedValues: readonly string[];
  let labels: Record<string, string>;

  if (control.allowedValues && control.labels) {
    allowedValues = control.allowedValues;
    labels = control.labels;
  } else if (control.options) {
    allowedValues = control.options.map((option) => String(option.value));
    labels = Object.fromEntries(control.options.map((option) => [String(option.value), option.label]));
  } else {
    console.warn(`FilterControl with key "${control.key}" has no options`);
    return null;
  }

  return (
    <ContentSelect
      key={control.key}
      value={String(control.value)}
      onChange={(value) => control.onChange(value)}
      allowedValues={allowedValues}
      labels={labels}
      triggerClassName={className}
    />
  );
};

export const renderSortControl = <T extends string>(sort: SortConfig<T>, className?: string) => {
  return (
    <ContentSelect
      value={sort.value}
      onChange={sort.onChange}
      allowedValues={sort.allowedValues}
      labels={sort.labels}
      triggerClassName={className}
    />
  );
};
