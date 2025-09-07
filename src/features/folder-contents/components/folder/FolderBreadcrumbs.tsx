import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { FolderBreadcrumb } from "@/components/FolderBreadcrumb";

type Breadcrumb = {
  id: string;
  name: string;
  color: string;
};

interface FolderBreadcrumbsProps {
  crateId: string;
  breadcrumbs: Breadcrumb[];
  onAction?: (action: string, folderId: string) => void;
}

function FolderBreadcrumbs({ crateId, breadcrumbs = [], onAction }: FolderBreadcrumbsProps) {
  // Determine if we are at the crate root
  const isAtRoot = breadcrumbs.length === 1 && breadcrumbs[0].name === "Root";

  // Last index for non-root folders
  const lastIndex = breadcrumbs.length - 1;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Crate Root */}
        <BreadcrumbItem>
          {isAtRoot ? (
            <BreadcrumbPage>Root</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link to="/crates/$crateId" params={{ crateId }}>
                Crate Root
              </Link>
            </BreadcrumbLink>
          )}
          {!isAtRoot && (
            <BreadcrumbSeparator>
              <ChevronRight className="w-4 h-4" />
            </BreadcrumbSeparator>
          )}
        </BreadcrumbItem>

        {/* Only render folder breadcrumbs if not at root */}
        {!isAtRoot &&
          breadcrumbs.map((crumb, idx) => {
            const isLast = idx === lastIndex;
            return (
              <BreadcrumbItem key={crumb.id}>
                {!isLast ? (
                  <>
                    <BreadcrumbLink asChild>
                      <Link
                        to="/crates/$crateId/folders/$folderId"
                        params={{ crateId, folderId: crumb.id }}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: crumb.color }}
                          />
                          {crumb.name}
                        </span>
                      </Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator>
                      <ChevronRight className="w-4 h-4" />
                    </BreadcrumbSeparator>
                  </>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <BreadcrumbPage>
                        <span className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: crumb.color }}
                          />
                          {crumb.name}
                        </span>
                      </BreadcrumbPage>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem onClick={() => onAction?.("rename", crumb.id)}>
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction?.("move", crumb.id)}>
                        Move
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAction?.("delete", crumb.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </BreadcrumbItem>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default FolderBreadcrumbs