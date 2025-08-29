import { useBulkDelete } from "../hooks/useBulkDelete";
import { useBulkMove } from "../hooks/useBulkMove";
import { useBulkRestore } from "../hooks/useBulkRestore";
import { useSelectionStore } from "../store/useSelectionStore";
import { Button } from "@/components/ui/button";

type BulkActionsToolBarProps = {
  crateId: string;
};

function BulkActionsToolBar({ crateId }: BulkActionsToolBarProps) {
  const { fileIds, folderIds, clearSelection } = useSelectionStore();

  const moveMutation = useBulkMove(crateId);
  const deleteMutation = useBulkDelete(crateId);
  const restoreMutation = useBulkRestore(crateId);

  if (fileIds.size === 0 && folderIds.size === 0) return null;

  const selection = {
    fileIds: Array.from(fileIds),
    folderIds: Array.from(folderIds),
  };

  const actions = [
    {
      label: "Move",
      variant: "default" as const,
      onClick: () => moveMutation.mutate({ ...selection, newParentId: null }),
    },
    {
      label: "Restore",
      variant: "default" as const,
      onClick: () => restoreMutation.mutate(selection),
    },
    {
      label: "Delete",
      variant: "destructive" as const,
      onClick: () => deleteMutation.mutate(selection),
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-secondary rounded-xl px-4 py-2 flex gap-3">
      {actions.map(({ label, variant, onClick }) => (
        <Button key={label} variant={variant} onClick={onClick}>
          {label}
        </Button>
      ))}

      <Button
        className="bg-secondary border-muted-foreground text-muted-foreground"
        variant="default"
        onClick={clearSelection}
      >
        Cancel
      </Button>
    </div>
  );
}

export default BulkActionsToolBar;
