import { ChevronDown } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

type Folder = {
  id: string;
  name: string;
  parentId: string | null;
};

type FolderBreadcrumbProps = {
  folderPath: Folder[];
  onNavigate: (folderId: string | null) => void;
  getSiblings: (parentId: string | null) => Folder[];
};

export function FolderBreadcrumb({ folderPath, onNavigate, getSiblings }: FolderBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {folderPath.map((folder, index) => {
          const isLast = index === folderPath.length - 1;
          const siblings = getSiblings(folder.parentId);

          return (
            <div key={folder.id || "root"} className="flex items-center">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{folder.name}</BreadcrumbPage>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <BreadcrumbLink className="flex items-center gap-1 cursor-pointer">
                        {folder.name}
                        <ChevronDown className="w-3 h-3" />
                      </BreadcrumbLink>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {siblings.map((sibling) => (
                        <DropdownMenuItem key={sibling.id} onSelect={() => onNavigate(sibling.id)}>
                          {sibling.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
