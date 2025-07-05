import { SidebarMenuItem } from "@/components/ui/sidebar";
import { useGetUserCrates } from "../hooks";
import { Box } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SidebarNavlink from "@/layouts/sidebar/SidebarNavlink";
import { useUserStore } from "@/features/auth";

function CrateSidebarLinks() {
  const { data: crates, isLoading } = useGetUserCrates();
  const { user } = useUserStore();

  if (isLoading) {
    return (
      <>
        {Array.from({ length: user?.crateLimit || 1 }).map((_, i) => (
          <SidebarMenuItem key={i}>
            <Skeleton className="h-4 w-3/4 rounded-md" />
          </SidebarMenuItem>
        ))}
      </>
    );
  }

  return (
    <>
      {crates?.map((crate) => (
        <SidebarMenuItem key={crate.id}>
          <SidebarNavlink
            to={`/crates/${crate.id}`}
            icon={
              <div
                className="rounded-md p-1 flex items-center justify-center"
                style={{ backgroundColor: crate.color, width: 24, height: 24 }}
              >
                <Box size={16} className="text-white" />
              </div>
            }
            text={crate.name}
          />
        </SidebarMenuItem>
      ))}
    </>
  );
}

export default CrateSidebarLinks;
