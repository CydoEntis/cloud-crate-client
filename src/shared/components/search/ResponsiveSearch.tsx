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
      {/* Mobile/tablet full-width search */}
      <div className={`w-full ${mobileClass}`}>
        <ContentInput 
          value={searchTerm} 
          onChange={onSearchTermChange} 
          placeholder={searchPlaceholder} 
          icon={Search} 
        />
      </div>

      {/* Desktop inline search - grows to fill available space */}
      <div className={`hidden w-full ${inlineClass}`}>
        <ContentInput 
          value={searchTerm} 
          onChange={onSearchTermChange} 
          placeholder={searchPlaceholder} 
          icon={Search} 
        />
      </div>
    </>
  );
}

export default ResponsiveSearch;