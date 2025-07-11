import { createFileRoute, Outlet } from "@tanstack/react-router";
import AvailableStorageIndicator from "@/features/storage/components/AvailableStorageIndicator";
import { ImageUpload } from "@/components/ImageUpload";

export const Route = createFileRoute("/(protected)/crates/$crateId")({
  component: CrateLayout,
});

function CrateLayout() {
  const { crateId } = Route.useParams();

  return (
    <section>
      <div className="flex justify-between items-center border-b border-gray-300 py-2">
        <h3 className="text-3xl font-bold">Crate {crateId}</h3>
      </div>

      <div className="mb-4">
        <AvailableStorageIndicator crateId={crateId} />
        <ImageUpload crateId={crateId} />
      </div>

      <Outlet />
    </section>
  );
}
