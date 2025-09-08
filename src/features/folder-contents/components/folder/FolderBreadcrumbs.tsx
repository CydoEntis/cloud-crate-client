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
import type { FolderBreadcrumb } from "../../types/folder/FolderBreadcrumb";



interface FolderBreadcrumbsProps {
  crateId: string;
  breadcrumbs: FolderBreadcrumb[];
  onAction?: (action: string, folderId: string) => void;
}

function FolderBreadcrumbs({ crateId, breadcrumbs = [], onAction }: FolderBreadcrumbsProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;

          return (
            <BreadcrumbItem key={crumb.id}>
              {!isLast ? (
                <BreadcrumbLink asChild>
                  <Link
                    to={crumb.isRoot ? "/crates/$crateId" : "/crates/$crateId/folders/$folderId"}
                    params={{ crateId, folderId: crumb.id }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded" style={{ backgroundColor: crumb.color }} />
                      {crumb.name}
                    </span>
                  </Link>
                </BreadcrumbLink>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <BreadcrumbPage>
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded" style={{ backgroundColor: crumb.color }} />
                        {crumb.name}
                      </span>
                    </BreadcrumbPage>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => onAction?.("rename", crumb.id)}>Rename</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAction?.("move", crumb.id)}>Move</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onAction?.("delete", crumb.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {!isLast && (
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default FolderBreadcrumbs;
