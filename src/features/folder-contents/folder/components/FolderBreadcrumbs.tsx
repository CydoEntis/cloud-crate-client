import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/shared/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { FolderBreadcrumb } from "../folderTypes";

interface FolderBreadcrumbsProps {
  crateId: string;
  breadcrumbs: FolderBreadcrumb[];
  onAction?: (action: string, folderId: string) => void;
}

function FolderBreadcrumbs({ crateId, breadcrumbs = [], onAction }: FolderBreadcrumbsProps) {
  const MAX_VISIBLE = 3; 
  const shouldCollapse = breadcrumbs.length > MAX_VISIBLE;

  if (!shouldCollapse) {
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
                  <BreadcrumbPage>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded" style={{ backgroundColor: crumb.color }} />
                      {crumb.name}
                    </span>
                  </BreadcrumbPage>
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

  const root = breadcrumbs[0];
  const current = breadcrumbs[breadcrumbs.length - 1];
  const parent = breadcrumbs[breadcrumbs.length - 2];
  const hidden = breadcrumbs.slice(1, -2);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Root */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to={root.isRoot ? "/crates/$crateId" : "/crates/$crateId/folders/$folderId"}
              params={{ crateId, folderId: root.id }}
            >
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: root.color }} />
                {root.name}
              </span>
            </Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator>
            <ChevronRight className="w-4 h-4" />
          </BreadcrumbSeparator>
        </BreadcrumbItem>

        {/* Ellipsis with dropdown */}
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {hidden.map((crumb) => (
                <DropdownMenuItem key={crumb.id} asChild>
                  <Link
                    to="/crates/$crateId/folders/$folderId"
                    params={{ crateId, folderId: crumb.id }}
                    className="flex items-center gap-2"
                  >
                    <span className="w-3 h-3 rounded" style={{ backgroundColor: crumb.color }} />
                    {crumb.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <BreadcrumbSeparator>
            <ChevronRight className="w-4 h-4" />
          </BreadcrumbSeparator>
        </BreadcrumbItem>

        {/* Parent */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/crates/$crateId/folders/$folderId" params={{ crateId, folderId: parent.id }}>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: parent.color }} />
                {parent.name}
              </span>
            </Link>
          </BreadcrumbLink>
          <BreadcrumbSeparator>
            <ChevronRight className="w-4 h-4" />
          </BreadcrumbSeparator>
        </BreadcrumbItem>

        {/* Current */}
        <BreadcrumbItem>
          <BreadcrumbPage>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded" style={{ backgroundColor: current.color }} />
              {current.name}
            </span>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default FolderBreadcrumbs;
