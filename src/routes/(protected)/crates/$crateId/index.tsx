import { createFileRoute } from "@tanstack/react-router";
import { FolderContentsView } from "@/features/files";

export const Route = createFileRoute("/(protected)/crates/$crateId/")({
  component: CrateIndex,
});

function CrateIndex() {
  const { crateId } = Route.useParams();

  return (
    <section>
      <h3 className="text-lg font-semibold mb-2">Root/</h3>
      <FolderContentsView crateId={crateId} folderId={null} />
    </section>
  );
}
