import React from "react";
import { Filter } from "lucide-react";
import { SearchInput } from "@/shared/components/search/SearchInput";
import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { type UseAdminFiltersReturn } from "@/features/admin/hooks/useAdminFilters";
import AdminFilterControls from "./AdminFilterControls";

type AdminFiltersProps = {
  filterControls: UseAdminFiltersReturn;
};

const AdminFilters: React.FC<AdminFiltersProps> = ({ filterControls }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { filters, activeFilterCount } = filterControls;

  const handleMobileClose = () => setIsOpen(false);

  return (
    <div className="space-y-4">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <SearchInput
              label="Search Users"
              value={filters.searchTerm}
              onChange={filterControls.handleSearchChange}
              placeholder="Search users by name or email..."
            />
          </div>

          <Drawer open={isOpen} onOpenChange={setIsOpen} >
            <DrawerTrigger asChild>
              <Button variant="outline" size="default" className="relative shrink-0 px-3 text-muted-foreground">
                <Filter className="h-4 w-4 " />
                <span className="ml-2 hidden sm:inline">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </DrawerTrigger>

            <DrawerContent className="p-6 border-muted">
              <DrawerHeader className="p-0 mb-0">
                <DrawerTitle className="text-left">Filter Users</DrawerTitle>
              </DrawerHeader>
              <DrawerDescription>Refine your user search with the filters below.</DrawerDescription>

              <div className="mt-6 space-y-4">
                <AdminFilterControls filterControls={filterControls} isMobile onMobileClose={handleMobileClose} />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:items-end md:justify-between md:gap-4">
        <AdminFilterControls filterControls={filterControls} />
      </div>
    </div>
  );
};

export default AdminFilters;
