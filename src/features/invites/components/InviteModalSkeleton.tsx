import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";

function InviteModalSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-2/3 mx-auto" />

      <div className="w-full flex justify-center items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-6 w-32" />
      </div>

      <Skeleton className="h-4 w-2/3 mx-auto mt-4" />

      <div className="flex gap-4 mt-4">
        <Button
          disabled
          className="flex-1 justify-center items-center rounded-lg bg-primary px-4 py-2 text-white opacity-50"
        >
          <Skeleton className="h-5 w-16" />
        </Button>
        <Button
          disabled
          variant="outline"
          className="flex-1 justify-center items-center rounded-lg border-primary text-primary px-4 py-2 opacity-50"
        >
          <Skeleton className="h-5 w-16" />
        </Button>
      </div>
    </div>
  );
}

export default InviteModalSkeleton;
