import { useState } from "react";
import { useDebouncedCallback } from "@react-hookz/web";

export function useFolderSearch(initialValue: string = "", delay: number = 300) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  const debouncedSetValue = useDebouncedCallback(
    (value: string) => {
      setDebouncedValue(value);
    },
    [],
    delay
  );

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    debouncedSetValue(value);
  };

  return {
    inputValue,
    debouncedValue,
    setSearch: handleSearchChange,
  };
}
