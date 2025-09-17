import { useCrateModalStore } from "@/features/crates/store/crateModalStore";
import type { GetCrateParams } from "@/features/crates/crateTypes";
import { Button } from "@/shared/components/ui/button";

type NoCratesFoundProps = {
  searchTerm: string;
  onFilterChange: (partial: Partial<GetCrateParams>) => void;
};

function NoCratesFound({ searchTerm, onFilterChange }: NoCratesFoundProps) {
  const { open } = useCrateModalStore();

  return (
    <div className="text-center py-16" role="region" aria-label="No crates found">
      <div className="w-20 h-20 mx-auto mb-4 text-muted-foreground/40">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8v.01M6 8v.01"
          />
        </svg>
      </div>
      <h2 className="text-xl font-medium text-foreground mb-2">
        {searchTerm ? "No matching crates" : "No crates yet"}
      </h2>
      <p className="text-muted-foreground max-w-sm mx-auto mb-6">
        {searchTerm
          ? `No crates match "${searchTerm}". Try adjusting your search or filters.`
          : "You haven't created or joined any crates yet. Create your first crate to get started."}
      </p>
      {searchTerm ? (
        <Button
          variant="outline"
          onClick={() => onFilterChange({ searchTerm: "", page: 1 })}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Clear Search
        </Button>
      ) : (
        <Button
          onClick={open}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Create Your First Crate
        </Button>
      )}
    </div>
  );
}

export default NoCratesFound;
