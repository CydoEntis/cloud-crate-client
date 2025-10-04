import * as React from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Clock, Loader2 } from "lucide-react";
import { SidebarMenuItem } from "@/shared/components/ui/sidebar";
import { cn } from "@/shared/lib/utils";
import { useRecentlyAccessedCrates } from "@/features/crates/api/crateQueries";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import TruncatedText from "@/shared/components/text/TruncatedText";

interface RecentCratesSectionProps {
  onItemClick?: () => void;
}

export function RecentCratesSection({ onItemClick }: RecentCratesSectionProps) {
  const [isOpen, setIsOpen] = React.useState(true);
  const { data: recentCrates, isLoading, isError } = useRecentlyAccessedCrates(5);

  if (isError || (!isLoading && (!recentCrates || recentCrates.length === 0))) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-2 px-2">
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 hover:text-primary rounded-md transition-colors group cursor-pointer">
        <div className="flex items-center gap-2 text-muted-foreground hover:text-primary cursor-pointer">
          <Clock className="text-muted-foreground h-5 w-5" />
          <span className="text-sm font-medium">Recent Crates</span>
        </div>
        <ChevronDown
          className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-1 space-y-1 px-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          recentCrates?.map((crate) => (
            <SidebarMenuItem key={crate.id}>
              <Link
                to="/crates/$crateId"
                params={{ crateId: crate.id }}
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:text-primary transition-colors group text-muted-foreground text-sm"
                activeProps={{
                  className: "text-primary",
                }}
                onClick={onItemClick}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: crate.color }}
                  aria-hidden="true"
                />
                <TruncatedText text={crate.name} maxLength={15} />
              </Link>
            </SidebarMenuItem>
          ))
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
