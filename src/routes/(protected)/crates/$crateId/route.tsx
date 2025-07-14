import { createFileRoute, Outlet } from "@tanstack/react-router";
import AvailableStorageIndicator from "@/features/storage/components/AvailableStorageIndicator";
import { useCrateDetails } from "@/features/crates/hooks/useCrateDetails";
import FileUpload from "@/features/files/components/FileUpload";

export const Route = createFileRoute("/(protected)/crates/$crateId")({
  component: CrateLayout,
});

function CrateLayout() {
  const { crateId } = Route.useParams();
  const { data, isLoading, isError } = useCrateDetails(crateId);

  if (isLoading) return <p>Loading crate info...</p>;
  if (isError || !data) return <p>Failed to load crate info</p>;

  return (
    <section>
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <h3 className="text-3xl font-bold">{data.name}</h3>
      </div>

      <div className="mb-4">
        <AvailableStorageIndicator crate={data} />
        <FileUpload crateId={crateId} />
      </div>

      <Outlet />
    </section>
  );
}
