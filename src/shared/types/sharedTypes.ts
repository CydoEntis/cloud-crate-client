import type { ReactNode } from "react";

export type FilterControl = {
  type: "select" | "tabs" | "custom";
  key: string;
  label: string;
  value: any;
  onChange: (value: any) => void;
  allowedValues?: readonly string[];
  labels?: Record<string, string>;
  options?: Array<{ value: any; label: string }>;
  component?: ReactNode;
};

export type SortConfig<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  allowedValues: readonly T[];
  labels: Record<T, string>;
  ascending: boolean;
  onOrderChange: (ascending: boolean) => void;
};
