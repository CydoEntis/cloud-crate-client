import { Trash2 } from "lucide-react";

function TrashPageHeader() {
  return (
    <div className="flex items-center gap-3 text-muted-foreground">
      <Trash2 className="h-6 w-6 text-muted-foreground" />
      <h1 className="text-2xl font-bold">Trash</h1>
    </div>
  );
}

export default TrashPageHeader;
