import type { UseFormReturn, FieldValues, Path } from "react-hook-form";

export function setFormErrors<T extends FieldValues>(form: UseFormReturn<T>, errors: Record<string, string>) {
  Object.entries(errors).forEach(([field, message]) => {
    form.setError(field as Path<T>, { type: "server", message });
  });
}
