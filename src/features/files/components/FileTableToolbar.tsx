import SearchInputField from "@/components/SearchInputField";
import { Button } from "@/components/ui/button";

type FileTableToolbarProps = {
  search: string;
  setSearch: (val: string) => void;
  onOpenCreateFolder: () => void;
};

function FileTableToolbar({ search, setSearch, onOpenCreateFolder }: FileTableToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <SearchInputField value={search} onChange={setSearch} placeholder="Search files or folders..." />
      <Button onClick={onOpenCreateFolder}>+ New Folder</Button>
    </div>
  );
}

export default FileTableToolbar;
