import type { AdminUserSearchParams } from "@/features/admin/adminTypes";
import { Button } from "@/shared/components/ui/button";

type NoUsersFoundProps = {
  searchTerm: string;
  onFilterChange: (partial: Partial<AdminUserSearchParams>) => void;
};

function NoUsersFound({ searchTerm, onFilterChange }: NoUsersFoundProps) {
  return (
    <div className="text-center py-16" role="region" aria-label="No users found">
      <div className="w-20 h-20 mx-auto mb-4 text-muted-foreground/40">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-medium text-foreground mb-2">
        {searchTerm ? "No matching users" : "No users found"}
      </h2>
      <p className="text-muted-foreground max-w-sm mx-auto mb-6">
        {searchTerm
          ? `No users match "${searchTerm}". Try adjusting your search or filters.`
          : "No users found with the current filter settings."}
      </p>
      <Button
        variant="outline"
        onClick={() =>
          onFilterChange({
            searchTerm: "",
            userType: "All",
            userStatus: "All",
            planFilter: "All",
            page: 1,
          })
        }
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Clear Filters
      </Button>
    </div>
  );
}

export default NoUsersFound;
