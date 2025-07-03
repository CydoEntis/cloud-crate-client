import SearchInputField from "@/components/SearchInputField";
import { Button } from "@/components/ui/button";

type Props = {
  search: string;
  setSearch: (val: string) => void;
  onCreateFolder: () => void;
};

function FileTableToolbar({ setSearch, onCreateFolder }: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <SearchInputField name="search" onDebouncedChange={setSearch} placeholder="Search files or folders..." />

      <Button onClick={onCreateFolder}>+ New Folder</Button>
    </div>
  );
}

export default FileTableToolbar;
