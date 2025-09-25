import { Search } from "lucide-react";
import ContentInput from "../filter/ContentInput";

type ResponsiveSearchProps = {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  searchPlaceholder: string;
  searchBreakpoint: "lg" | "2xl";
};

function ResponsiveSearch({
  searchTerm,
  onSearchTermChange,
  searchPlaceholder,
  searchBreakpoint,
}: ResponsiveSearchProps) {
  const mobileClass = searchBreakpoint === "2xl" ? "2xl:hidden" : "lg:hidden";
  const inlineClass = searchBreakpoint === "2xl" ? "2xl:block 2xl:flex-1" : "lg:block lg:flex-1";

  return (
    <>
      <div className={mobileClass}>
        <ContentInput value={searchTerm} onChange={onSearchTermChange} placeholder={searchPlaceholder} icon={Search} />
      </div>

      <div className={`hidden ${inlineClass}`}>
        <ContentInput value={searchTerm} onChange={onSearchTermChange} placeholder={searchPlaceholder} icon={Search} />
      </div>
    </>
  );
}

export default ResponsiveSearch;
